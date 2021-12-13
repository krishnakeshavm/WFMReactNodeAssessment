const Logout=()=>{  
    localStorage.clear()
    return(
        <div className="d-flex flex-row-reverse">
            <a href="/login" className="btn btn-info btn-lg">
                <span className="glyphicon glyphicon-log-out"></span> Log out
            </a>
        {/* <a href='/login' className="btn btn-default btn-sm">
        <button className="fa fa-sign-out =btn btn-info">Log out</button> </a> */}
        </div>
    )
}

export default Logout;