import {createRoot} from "react-dom/client" 
import App from "./App"
import "./index.css"

let rootId = document.getElementById("root")
let root = createRoot(rootId)

root.render(<App/>)