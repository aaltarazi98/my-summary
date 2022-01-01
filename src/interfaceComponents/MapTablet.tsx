import Iframe from 'react-iframe';

export function MapTablet() {
    interface Location{
        address: string,
        city: string,
        country?: string,
        state: string,
        zipcode: string,
    }
    const home: Location | null = JSON.parse(localStorage.getItem('home') || '{}')
    const work: Location | null = JSON.parse(localStorage.getItem('work') || '{}')

    if (home?.address && work?.address){
        const homeAdd: string | undefined = home?.address?.split(" ").join("+") + "," + home?.city.split(" ").join("+") + "," + home?.state.split(" ").join("+")
        const workAdd: string | undefined = work?.address?.split(" ").join("+") + "," + work?.city.split(" ").join("+") + "," + work?.state.split(" ").join("+")
        return(
            <div className = "map">
                <h2 style={{textAlign: "center", marginBottom: "2vh", lineHeight: "1vh", marginTop:"3vh"}}>Map</h2>
                <Iframe url ={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCr-dJeM_y9G6A-IzOdbAAEuAPizoVbffI&origin=${homeAdd}&destination=${workAdd}&avoid=tolls`}
                className="mapDisplay"
                />
            </div>
        )
    }else{
        return (
            <div className = "map">
                <h2 style={{textAlign: "center", marginBottom: "2vh", lineHeight: "1vh", marginTop:"3vh"}}>Map</h2>
                <div className='loader' style={{height: '85%'}}>
                    <h3>You have not set up your home & work addresses!</h3>
                </div>
            </div>
        )
    }

}
