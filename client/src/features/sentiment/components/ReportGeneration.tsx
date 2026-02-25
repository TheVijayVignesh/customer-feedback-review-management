import {useState} from 'react';

const ReportGeneration = () => {
  
    const [name,setName] = useState("");


    const handleExport = async () => {
        const response = await fetch("http://localhost:5000/api/analysis/export",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name}),
        });

        if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong");
        return;
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
  
  
    return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-6 shadow-lg">
    <div>
      <p className="w-full border-2 border-cyan-400 rounded-lg px-2 py-3 font-bold ">Report Generator</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition duration-200"
      />
      <div className="flex justify-center">
      <button onClick={handleExport} className="bg-purple-700 text-white px-3 py-3 rounded-xl 
                       hover:bg-indigo-500 active:scale-95 
                       transition duration-200 font-medium shadow-md">download</button>
      </div>
    </div>
  </div>
  )
}

export default ReportGeneration
