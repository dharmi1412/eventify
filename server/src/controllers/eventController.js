import Event from "../models/Event.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

const PLATFORM_FEE_PER_TICKET = 49;

export const listEvents = catchAsync(async (req, res) => {
  const { category, search, sort = "default", page = 1, limit = 12 } = req.query;
  const q = { orgStatus: { $nin: ["Draft", "Cancelled"] } };
  if (category && category !== "All") q.category = category;
  if (search) {
    q.$or = [
      { title: new RegExp(search, "i") },
      { location: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
    ];
  }
  let sortSpec = { createdAt: -1 };
  if (sort === "price-asc") sortSpec = { price: 1 };
  if (sort === "price-desc") sortSpec = { price: -1 };
  if (sort === "fill") sortSpec = { booked: -1 };

  const skip = (Math.max(1, +page) - 1) * Math.min(50, Math.max(1, +limit));
  const take = Math.min(50, Math.max(1, +limit));
  const [items, total] = await Promise.all([
    Event.find(q).sort(sortSpec).skip(skip).limit(take).populate("organizer", "name email"),
    Event.countDocuments(q),
  ]);

  const mapEvent = (e) => ({
    id: e._id,
    title: e.title,
    category: e.category,
    date: e.date,
    time: e.time,
    location: e.location,
    price: e.price,
    emoji: e.emoji,
    seats: e.seats,
    booked: e.booked,
    description: e.description,
    orgStatus: e.orgStatus,
    bannerUrl: e.bannerUrl,
    organizer: e.organizer
      ? { id: e.organizer._id, name: e.organizer.name, email: e.organizer.email }
      : null,
  });

  res.json({
    success: true,
    data: { events: items.map(mapEvent), total, page: +page, limit: take },
  });
});

export const getEvent = catchAsync(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("organizer", "name email");
  if (!event) throw new ApiError(404, "Event not found");
  res.json({
    success: true,
    data: {
      event: {
        id: event._id,
        title: event.title,
        category: event.category,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price,
        emoji: event.emoji,
        seats: event.seats,
        booked: event.booked,
        description: event.description,
        orgStatus: event.orgStatus,
        bannerUrl: event.bannerUrl,
        organizer: event.organizer,
      },
    },
  });
});

export const createEvent = catchAsync(async (req, res) => {
  const body = { ...req.body, organizer: req.user._id };
  delete body.booked;
  const event = await Event.create(body);
  res.status(201).json({ success: true, data: { event } });
});

export const updateEvent = catchAsync(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");
  const isOwner = event.organizer.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) throw new ApiError(403, "Not allowed to edit this event");
  const allowed = [
    "title",
    "description",
    "category",
    "date",
    "time",
    "location",
    "price",
    "emoji",
    "seats",
    "orgStatus",
    "bannerUrl",
  ];
  for (const key of allowed) {
    if (req.body[key] !== undefined) event[key] = req.body[key];
  }
  await event.save();
  res.json({ success: true, data: { event } });
});

export const deleteEvent = catchAsync(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");
  const isOwner = event.organizer.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) throw new ApiError(403, "Not allowed to delete this event");
  await event.deleteOne();
  res.json({ success: true, message: "Event deleted" });
});

export const myOrganizerEvents = catchAsync(async (req, res) => {
  if (req.user.role !== "organizer" && req.user.role !== "admin") {
    throw new ApiError(403, "Organizer role required");
  }
  const events = await Event.find({ organizer: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: { events } });
});

export { PLATFORM_FEE_PER_TICKET };
