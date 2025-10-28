export default function StudyMap({ current, studyMap = {}, copyToClipboard }) {
  const {
    intro = "",
    reading = [],
    listening = [],
    speaking = { delivery: [], content: [] },
    writing = { integrated: [], academicDiscussion: [] },
  } = studyMap;

  return (
    <section className={`${current.card} p-5 rounded-2xl shadow-md md:col-span-2`}>
      <h2 className="text-xl font-bold mb-2">Study Map</h2>
      <p className="text-sm text-gray-700 mb-4">{intro}</p>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold">Reading</h3>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {reading.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mt-3">Listening</h3>
          <ul className="list-disc ml-5 text-sm text-gray-700">
            {listening.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mt-3">Speaking</h3>
          <div className="text-sm text-gray-700">
            <strong>Delivery:</strong>
            <ul className="list-disc ml-5">{speaking.delivery.map((d, i) => <li key={i}>{d}</li>)}</ul>
            <strong className="mt-2 block">Content:</strong>
            <ul className="list-disc ml-5">{speaking.content.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mt-3">Writing</h3>
          <div className="text-sm text-gray-700">
            <strong>Integrated:</strong>
            <ul className="list-disc ml-5">{writing.integrated.map((w, i) => <li key={i}>{w}</li>)}</ul>
            <strong className="mt-2 block">Academic Discussion:</strong>
            <ul className="list-disc ml-5">{writing.academicDiscussion.map((w, i) => <li key={i}>{w}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          className={`px-4 py-2 rounded-md text-white ${current.btn}`}
          onClick={() => copyToClipboard(JSON.stringify(studyMap, null, 2))}
        >
          Copy study map
        </button>

        <button className="px-4 py-2 rounded-md border" onClick={() => alert("Saved to your account (demo)")}>
          Save (demo)
        </button>
      </div>
    </section>
  );
}
