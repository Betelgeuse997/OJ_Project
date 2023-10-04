import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Coders Arena</h1>
            <br />
            {/* <h2>Public</h2> */}
            <Link to="/Signin">Login</Link>
            <Link to="/Register">Register</Link>
            <br />
            {/* <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/editor">Editors Page</Link>
            <Link to="/admin">Admin Page</Link> */}
        </section>
    )
}

export default LinkPage