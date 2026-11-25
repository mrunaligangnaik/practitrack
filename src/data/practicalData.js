// All practical content lives here.
// To edit a practical, change the text inside the quotes.
// sample: true means this is sample text, not my final submitted work.

const practicals = [
  {
    id: 1,
    title: "Node.js Modules",
    description: "Create and use modules in Node.js.",
    aim: "To demonstrate Node.js modules.",
    theory: "A module is a separate file with reusable code. We export it from one file and use require() to bring it into another.",
    procedure: "Create math.js with an add function, export it, then require it in app.js.",
    code: "// math.js\nexports.add = (a, b) => a + b;\n\n// app.js\nconst math = require('./math');\nconsole.log(math.add(2, 3));",
    output: "5",
    conclusion: "Modules keep code organised and reusable.",
    sample: true
  },
  {
    id: 2,
    title: "Node.js Events",
    description: "Create and fire events using EventEmitter.",
    aim: "To demonstrate various Node.js events.",
    theory: "Node.js works on events. The EventEmitter class lets us create an event with on() and fire it with emit().",
    procedure: "Import the events module, create an emitter, add a listener and emit the event.",
    code: "const EventEmitter = require('events');\nconst myEvent = new EventEmitter();\n\nmyEvent.on('hello', () => {\n  console.log('Event fired');\n});\n\nmyEvent.emit('hello');",
    output: "Event fired",
    conclusion: "Events help us run code when something happens.",
    sample: true
  },
  {
    id: 3,
    title: "Node.js Functions",
    description: "Write and call different types of functions.",
    aim: "To demonstrate Node.js functions.",
    theory: "A function is a block of code that runs when it is called. Node.js supports normal functions and arrow functions.",
    procedure: "Write a normal function and an arrow function, then call both.",
    code: "function greet(name) {\n  return 'Hello ' + name;\n}\n\nconst add = (a, b) => a + b;\n\nconsole.log(greet('Student'));\nconsole.log(add(4, 5));",
    output: "Hello Student\n9",
    conclusion: "Functions avoid repeating the same code.",
    sample: true
  },
  {
    id: 4,
    title: "File Handling",
    description: "Create, write, read and delete files.",
    aim: "To demonstrate all basic file operations using the fs module.",
    theory: "The fs module lets Node.js work with files. We can create, write, read and delete a file.",
    procedure: "Use writeFileSync to create a file, readFileSync to read it and unlinkSync to delete it.",
    code: "const fs = require('fs');\n\nfs.writeFileSync('a.txt', 'Hello');\nconsole.log(fs.readFileSync('a.txt', 'utf8'));\nfs.unlinkSync('a.txt');",
    output: "Hello",
    conclusion: "The fs module makes file operations simple.",
    sample: true
  },
  {
    id: 5,
    title: "HTTP Server",
    description: "Create a server and handle requests.",
    aim: "To create an HTTP server and perform operations on it.",
    theory: "The http module can create a web server. It receives a request (req) and sends back a response (res).",
    procedure: "Use http.createServer, send a response and listen on port 3000.",
    code: "const http = require('http');\n\nhttp.createServer((req, res) => {\n  res.end('Hello from server');\n}).listen(3000);",
    output: "Browser shows 'Hello from server' at localhost:3000.",
    conclusion: "Node.js can work as a web server without extra software.",
    sample: true
  },
  {
    id: 6,
    title: "MySQL Connection",
    description: "Connect Node.js to a MySQL database.",
    aim: "To connect Node.js with MySQL and perform basic database operations.",
    theory: "The mysql2 package connects Node.js to a MySQL database. After connecting we can run queries like SELECT and INSERT.",
    procedure: "Install mysql2, create a connection, connect and run a query.",
    code: "const mysql = require('mysql2');\n\nconst db = mysql.createConnection({\n  host: 'localhost',\n  user: 'root',\n  password: '',\n  database: 'college'\n});\n\ndb.connect(() => console.log('Connected'));",
    output: "Connected",
    conclusion: "Node.js can store and read data from a database.",
    sample: true
  },
  {
    id: 7,
    title: "Component Life Cycle",
    description: "Mount, update and unmount of a class component.",
    aim: "To implement the component life cycle in ReactJS.",
    theory: "A component is created (mount), changed (update) and removed (unmount). Class components give us a method for each stage.",
    procedure: "Create a class component and add componentDidMount, componentDidUpdate and componentWillUnmount.",
    code: "class Demo extends React.Component {\n  componentDidMount() {\n    console.log('Mounted');\n  }\n  render() {\n    return <h2>Lifecycle</h2>;\n  }\n}",
    output: "Console shows 'Mounted' when the component appears.",
    conclusion: "I learned when each lifecycle method runs.",
    sample: true
  },
  {
    id: 8,
    title: "Class and Functional Components",
    description: "Two ways of writing a React component.",
    aim: "To implement class and functional components in ReactJS.",
    theory: "A functional component is a simple function that returns JSX. A class component uses a render() method.",
    procedure: "Write one functional and one class component and show both in App.",
    code: "function Hello() {\n  return <h2>Hello</h2>;\n}",
    output: "Both components show their text on the page.",
    conclusion: "Functional components are shorter and easier to read.",
    sample: true
  },
  {
    id: 9,
    title: "Import and Export",
    description: "Splitting code into separate files.",
    aim: "To import and export files (components) in ReactJS.",
    theory: "export makes a component available outside its file. import brings it into another file.",
    procedure: "Create a component file, use export default, then import it in App.jsx.",
    code: "// Card.jsx\nexport default function Card() {\n  return <div>Card</div>;\n}\n\n// App.jsx\nimport Card from './Card';",
    output: "The Card component appears inside App.",
    conclusion: "Separate files keep the project clean.",
    sample: true
  },
  {
    id: 10,
    title: "State and Props",
    description: "Store data and pass it to child components.",
    aim: "To implement state and props in ReactJS.",
    theory: "State is data owned by a component that can change. Props are values sent from a parent to a child.",
    procedure: "Keep a value in useState and send it to a child as a prop.",
    code: "function Child(props) {\n  return <p>{props.name}</p>;\n}",
    output: "The child shows the name sent by the parent.",
    conclusion: "Props move data down, state keeps it updated.",
    sample: true
  },
  {
    id: 11,
    title: "DOM Events",
    description: "Handling clicks, typing and form events.",
    aim: "To use DOM events in ReactJS.",
    theory: "React events use camelCase names like onClick and onChange and call a function when the user acts.",
    procedure: "Add a button with onClick and an input with onChange.",
    code: "<button onClick={() => alert('Clicked')}>\n  Click\n</button>",
    output: "An alert appears when the button is clicked.",
    conclusion: "Events make a page interactive.",
    sample: true
  },
  {
    id: 12,
    title: "Form Validation",
    description: "Checking form input before submitting.",
    aim: "To create a form in ReactJS and add client and server side validation.",
    theory: "Validation checks that the user entered correct data, for example a non-empty name and a valid email. Client side validation runs in the browser, server side validation runs on the server.",
    procedure: "On submit, check each field and show an error message if it is wrong.",
    code: "if (name === '') {\n  setError('Name is required');\n}",
    output: "An error message shows for empty fields.",
    conclusion: "Validation stops wrong data from being submitted.",
    sample: true
  },
  {
    id: 13,
    title: "React Hooks",
    description: "useState, useEffect and useRef.",
    aim: "To implement React Hooks.",
    theory: "Hooks let functional components use state and side effects. useRef points to an element directly.",
    procedure: "Use useState for a counter, useEffect for a side effect and useRef to focus an input.",
    code: "const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  document.title = count;\n}, [count]);",
    output: "The page title changes when the counter changes.",
    conclusion: "Hooks make functional components powerful.",
    sample: true
  },
  {
    id: 14,
    title: "SPA using React Router",
    description: "Multiple pages without reloading the browser.",
    aim: "To create a Single Page Application using React Router.",
    theory: "React Router changes the visible component based on the URL, so the page never reloads.",
    procedure: "Wrap the app in BrowserRouter, then add Routes, Route and NavLink.",
    code: "<Routes>\n  <Route path=\"/\" element={<Home />} />\n  <Route path=\"/about\" element={<About />} />\n</Routes>",
    output: "Clicking menu links switches pages instantly.",
    conclusion: "Routing gives a multi-page feel in one page.",
    sample: true
  }
];

export default practicals;