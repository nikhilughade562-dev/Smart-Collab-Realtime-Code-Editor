
import run from '../assets/Run.png'
import Room from '../assets/Room.png'
import download from '../assets/Download.jpg'
import editor from '../assets/Editor.png'

const features = [
  {
    id: 1,
    title: "Multi-Language Code Editor",
    description:
      "Write and edit code in multiple programming languages with proper syntax highlighting and tooling.",
    image:editor,
  },
  {
    id: 2,
    title: "Run Code Instantly",
    description:
      "Execute code directly inside the editor and view outputs without leaving the workspace.",
    image:run,
  },
  {
    id: 3,
    title: "Copy & Download Code",
    description:
      "Easily copy code to clipboard or download files in the selected programming language format.",
    image:download,
  },
  {
    id: 4,
    title: "Room-Based Sessions",
    description:
      "Create secure rooms and collaborate by sharing a unique room ID with others.",
    image:Room,
  },
  
];

export default features;
