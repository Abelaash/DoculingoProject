import React,{useEffect} from "react";


function App(){
    return (
        <div className="App">
            <div>
                Detect language:
                <select>
                    <option value="English">English</option>
                    <option value="French">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Vietnamese">Vietnamese</option>
                </select>
                Translate To:
                <select>
                    <option value="English">English</option>
                    <option value="French">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Vietnamese">Vietnamese</option>
                </select>
            </div>
            <div>
                <textarea cols="50" row="8"></textarea>
            </div>

            <div>
                <textarea cols="50" row="8"></textarea>
            </div>
            <div>
                <button>Translate language</button>
            </div>
        </div>
    )
}
export default App();