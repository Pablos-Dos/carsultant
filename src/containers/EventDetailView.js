// Detailansicht der Events

import React from "react";
// wird für Anschluss an Backend benötigt
import axios from "axios";

const ListData =

    [
        {
            "id": 1,
            "title": "Warm Up Tour - European Drivers Club",
            "description": "2 Übernachtungen in zwei ausgewählten Luxushotels",
            "completed": false
        },
        {
            "id": 2,
            "title": "Ferraritreffen in Berwang Juni 2020",
            "description": "Wunderschöne Landschaften und einzigartige Routen erwarten Sie.",
            "completed": false
        },
        {
            "id": 3,
            "title": "BMW M Power Dolomiti King",
            "description": "Almhof Hotel Call, St. Vigil Bozen",
            "completed": false
        },
        {
            "id": 4,
            "title": "Reisbrennen 2020",
            "description": "Das Reisbrennen ist ein internationales Treffen für Japanische Fahrzeuge, Tuning & Rennbegeisterte sowie Fans der Importszene.",
            "completed": false
        },
        {
            "id": 5,
            "title": "Internationales Sportwagenfestival Velden 2020",
            "description": "Es ist wieder soweit! Der Wörthersee, die „Riviera Österreichs“ ruft.",
            "completed": false
        }
    ]


class EventDetail extends React.Component {

    state = {
        event: {},
        firstName: '',
        showName: false
    };

    componentDidMount() {

        const eventID = this.props.match.params.eventID;
        // parseInt(eventID, 10);
        axios.get(`/api/calender/${eventID}`).then(res => {
            this.setState({
                event: res.data
            });
        });
    };

    displayNameHandler = (e) => {
        let updatedName = e.target.value;
        this.setState({firstName: updatedName});
        //console.log(updatedName);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            showName: true
        });
    };

    render() {
        const eventID = this.props.match.params.eventID - 1;
        // console.log(ListData[eventID].title);
        return (

            <main className="content">
                <div className='masthead-wrap'>
                    <header className="masthead-detail">
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-12 text-center">
                                    <h1 className="font-weight-light">Vertically Centered Masthead Content</h1>
                                    <p className="lead">A great starter layout for a landing page</p>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <h1 className="display-3">{this.state.event.title}</h1>
                <p className="text_detail">&#x1F4CD; {this.state.event.location} <br></br></p>
                <p className="text_detail">&#x1F550; {this.state.event.time} <br></br></p>
                <p className="text_detail">&#x1f4c5; {this.state.event.date} <br></br></p><br></br><br></br>
                <p className="text_detail">{this.state.event.description} <br></br>
                    Melden Sie sich jetzt an.</p>
                <form form onSubmit={this.handleSubmit}>
                    <div className="form-row align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Vorname</label>
                            <input type="text" name="firstName" onChange={this.displayNameHandler}
                                   value={this.state.firstName} className="form-control" id="inputEmail4"
                                   placeholder="Max"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Nachname</label>
                            <input type="password" className="form-control" id="inputPassword4"
                                   placeholder="Mustermann"></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Addresse</label>
                        <input type="text" className="form-control" id="inputAddress"
                               placeholder="Musterstraße 5"></input>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCity">Stadt</label>
                            <input type="text" className="form-control" id="Berlin"></input>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">Bundesland</label>
                            <select id="inputState" className="form-control">
                                <option selected>Wähle...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputZip">Postleitzahl</label>
                            <input type="text" className="form-control" id="inputZip"></input>
                        </div>
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Anmelden</button>
                    {this.state.showName && <p>Du hast dich angemeldet. Danke {this.state.firstName}</p>}
                </form>
                <span id="message"></span>
            </main>

        );
    }
}

export default EventDetail;