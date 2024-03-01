import payload from "payload";
import { useField, useFormFields } from "payload/components/forms";
import React, { useEffect, useState } from "react";

export const TracksByGenre: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const genre = useFormFields(([fields]) => fields.title);

  const genreValue = genre.value as React.ReactNode;
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      const tracks = await payload.find({
        collection: "list-picks",
        depth: 2,
      });

      setTracks(tracks);
    }

    fetchTracks();
  }, []);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  return (
    <div className="field-type text">
      <label htmlFor="track-by-genre" className="field-label">
        Demo UI Fieaald {genreValue}
      </label>
      <div className="input-wrapper">
        <input
          id="track-by-genre"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};
