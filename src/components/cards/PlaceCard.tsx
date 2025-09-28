import { useState } from "react";
import { PlaceDTO } from "../../types/place";
import { FaPlus } from "react-icons/fa";
import TableActions from "../tables/TableActions";

const PlaceCard = ({
  place,
  onAddSlot,
  onDelete,
  onEdit,
}: {
  place: PlaceDTO;
  onAddSlot?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}) => {
  const [showImage, setShowImage] = useState(true);

  // Pick the first valid image URL. Support both string URLs and objects returned by some upload APIs.
  const firstImage = (() => {
    const imgs = (place.images || []) as any[];
    for (const it of imgs) {
      if (!it) continue;
      if (typeof it === "string") return it;
      if (typeof it === "object") {
        if (it.secure_url) return it.secure_url;
        if (it.url) return it.url;
        if (it.path) return it.path;
      }
    }
    return "";
  })();

  // ensure URL has protocol (cloudinary returns https urls but just in case)
  const normalizeUrl = (u: string) => {
    if (!u) return "";
    // already absolute
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    // protocol-relative (//host/path)
    if (u.startsWith("//")) return `https:${u}`;
    // root-relative (starts with '/') - likely uploaded path on backend
    if (u.startsWith("/")) {
      // prefer Vite env or fallback to known backend URL
      const apiBase = (import.meta as any).env?.VITE_API_BASE_URL || "https://booking-tour-backend-mlgs.onrender.com";
      return `${apiBase.replace(/\/$/, "")}${u}`;
    }
    // otherwise assume it's a hostless path, try https
    return `https://${u}`;
  };
  const isHttpUrl = (u: string) => typeof u === "string" && /^(https?:)?\/\//i.test(u);
  const normalizedFirstImage = normalizeUrl(firstImage || "");
  const hasValidImage = isHttpUrl(normalizedFirstImage) && normalizedFirstImage.length > 0;
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="w-full bg-gray-100 overflow-hidden">
        <div className="w-full aspect-[3/2] bg-gray-100 flex items-center justify-center overflow-hidden">
          {hasValidImage && showImage ? (
            <img
              src={normalizedFirstImage}
              alt={place.name}
              className="w-full h-full object-cover"
              onError={() => setShowImage(false)}
            />
          ) : (
            // show a small placeholder image from public assets
            <img
              src="/logo192.png"
              alt="placeholder"
              className="w-24 h-24 object-contain text-gray-400"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{place.location}</p>
          {place.description && (
            <p className="text-sm text-gray-700 mt-2 line-clamp-3">{place.description}</p>
          )}
          {/* Slots preview */}
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700">Slots</h4>
            {Array.isArray(place.slots) ? (
              place.slots.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {place.slots
                  .slice()
                  .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
                  .slice(0, 3)
                  .map((s) => {
                    const booked = s.bookedCount ?? 0;
                    const remaining = Math.max(0, (s.capacity || 0) - booked);
                    return (
                      <li key={s._id} className="flex items-center justify-between text-sm text-gray-700">
                        <div>
                          <div>{new Date(s.startAt).toLocaleString()}</div>
                        </div>
                        <div className="ml-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${remaining > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                          >
                            {remaining} left
                          </span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              ) : (
                <div className="mt-2 text-sm text-gray-500">No upcoming slots</div>
              )
            ) : (
              // Backend may not include slots on the place list endpoint (to keep payload small).
              // Don't show a misleading "No slots" message; encourage the user to open details
              // where the full slots list is fetched.
              <div className="mt-2 text-sm text-gray-500">
                No upcoming slots previewed. <a href={`/places/${place._id}`} className="text-indigo-600 hover:underline">View details</a>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions - anchored to bottom so action buttons don't float */}
        <div className="mt-auto flex items-center justify-start gap-3">
          {onAddSlot && (
            <button
              onClick={() => onAddSlot(place._id!)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <FaPlus /> Add Slot
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(place._id!)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Edit
            </button>
          )}

          {onDelete && <TableActions onDelete={() => onDelete(place._id!)} />}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
