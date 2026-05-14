import dns from "node:dns";
import mongoose from "mongoose";

function isSrvDnsFailure(err) {
  const msg = String(err?.message || "");
  return (
    err?.syscall === "querySrv" ||
    msg.includes("querySrv") ||
    (err?.code === "ECONNREFUSED" && msg.includes("_mongodb._tcp"))
  );
}

function printSrvDnsHelp() {
  console.error(`
MongoDB Atlas DNS (SRV) lookup failed — Node could not resolve _mongodb._tcp.*.mongodb.net.

Try, in order:
  1) Atlas → Database → Connect → Drivers → use the "standard connection string"
     (mongodb://host1:27017,host2:27017,...) and set MONGODB_URI to that instead of mongodb+srv://
  2) Set PC DNS to 8.8.8.8 and 1.1.1.1, then: ipconfig /flushdns  (Windows)
  3) Disable VPN / corporate proxy temporarily; allow outbound DNS (UDP 53)
`);
}

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  // Some Windows / dual-stack networks fail Atlas SRV until IPv4 is preferred.
  try {
    dns.setDefaultResultOrder("ipv4first");
  } catch {
    /* Node < 17 */
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 25_000,
    });
  } catch (err) {
    if (isSrvDnsFailure(err)) printSrvDnsHelp();
    throw err;
  }

  return mongoose.connection;
}
