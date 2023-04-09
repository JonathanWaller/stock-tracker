

import Nav from "./Nav";



interface Props {
    children: any;
}

const Layout = ({children}: Props ) => {
    return(
        <>
            <Nav />
            <main>{children}</main>
        </>
    )
}

export default Layout;