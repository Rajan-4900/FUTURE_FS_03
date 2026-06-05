import { searchChargingStations } from "@/lib/stationSearch";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return Response.json({ success: false, error: "Please enter a city, address, or postal code." }, { status: 400 });
  }

  try {
    const result = await searchChargingStations(q);

    if (!result.success) {
      return Response.json(result, { status: 404 });
    }

    if (result.stations.length === 0) {
      return Response.json({
        success: false,
        error: `No public charging stations found within 30 km of ${result.location.label}.`,
        location: result.location,
      }, { status: 404 });
    }

    return Response.json(result);
  } catch (error) {
    console.error("Station search error:", error);
    return Response.json(
      { success: false, error: "Unable to search charging stations right now. Please try again." },
      { status: 500 }
    );
  }
}
