// frontend/src/App.js
// Events für EventListView

import React, {Component} from "react";
import Reveal from 'react-reveal/Reveal';
import '../animate.css';
import Modal from "../components/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText} from 'mdbreact';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from '../App';

const ListData =
    [
        {
            "id": 1,
            "title": "Warm Up Tour - European Drivers Club",
            "description": "2 Übernachtungen in zwei ausgewählten Luxushotels",
            "location": "Rathaus Pankow",
            "date": "29.03.2020",
            "time": "14:00 - 18:00 Uhr",
            "completed": false
        },
        {
            "id": 2,
            "title": "Ferraritreffen in Berwang Juni 2020",
            "description": "Wunderschöne Landschaften und einzigartige Routen erwarten Sie.",
            "location": "Rathaus Pankow",
            "date": "29.03.2020",
            "time": "14:00 - 18:00 Uhr",
            "completed": false
        },
        {
            "id": 3,
            "title": "BMW M Power Dolomiti King",
            "description": "Almhof Hotel Call, St. Vigil Bozen",
            "location": "Rathaus Pankow",
            "date": "29.03.2020",
            "time": "14:00 - 18:00 Uhr",
            "completed": false
        },
        {
            "id": 4,
            "title": "Reisbrennen 2020",
            "description": "Das Reisbrennen ist ein internationales Treffen für Japanische Fahrzeuge, Tuning & Rennbegeisterte sowie Fans der Importszene.",
            "location": "Rathaus Pankow",
            "date": "29.03.2020",
            "time": "14:00 - 18:00 Uhr",
            "completed": false
        },
        {
            "id": 5,
            "title": "Internationales Sportwagenfestival Velden 2020",
            "description": "Es ist wieder soweit! Der Wörthersee, die „Riviera Österreichs“ ruft.",
            "location": "Rathaus Pankow",
            "date": "29.03.2020",
            "time": "14:00 - 18:00 Uhr",
            "completed": false
        }
    ]

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            showMe: true,
            activeItem: {
                title: "",
                description: "",
                completed: false
            },
            todoList: []
        };
    }

    // wird sofort nach Component-Aufruf aufgerufen.
    componentDidMount() {
        this.refreshList();
    }

    /*BACKEND*/
    refreshList = () => {
        axios
            // .get("http://83.171.239.174:4001/api/calender/")
            .get("/api/calender/")
            .then(res => this.setState({todoList: res.data}))
            .catch(err => console.log(err));
    };
    displayCompleted = status => {
        if (status) {
            return this.setState({viewCompleted: true});
        }
        return this.setState({viewCompleted: false});
    };
    // Tab Liste
    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
            </div>
        );
    };

    operation() {
        this.setState({
            showMe: !this.state.showMe
        })
    }

    /*/BACKEND*/

    // Einträge
    renderItems = () => {
        const {viewCompleted} = this.state;
        // const newItems = ListData;
        const newItems = this.state.todoList.filter(
            item => item.completed === viewCompleted
        );
        return newItems.map(item => (
            <Reveal effect="fadeInUp">
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <MDBCardImage className="img-fluid"
                                          src='http://motorsport-events.net/wp-content/uploads/2017/10/IMG_1622.jpg'
                                          waves/>
                        </div>
                        <div className="col-sm">
                            <MDBCardBody>
                                <MDBCardTitle>{item.title}</MDBCardTitle>
                                <MDBCardText>
                                    {item.description}
                                </MDBCardText>
                                <Router>
                                    <a href={item.id}>
                                        <button>Weiterlesen →</button>
                                    </a>
                                    <Route
                                        path={'/' + item.id}
                                        render={(props) => <App {...props} isAuthed={true}/>}
                                    />
                                </Router>
                            </MDBCardBody>
                        </div>
                        <div className="col-sm">
                            <MDBCardBody>
                                <MDBCardText>
                                    &#x1F4CD; {item.location}
                                </MDBCardText>
                                <MDBCardText>
                                    &#x1F550; {item.time}
                                </MDBCardText>
                                <MDBCardText>
                                    &#x1f4c5; {item.date}
                                </MDBCardText>
                            </MDBCardBody>
                        </div>
                    </div>
                </div>
            </Reveal>
        ));
    };
    toggle = () => {
        this.setState({modal: !this.state.modal});
    };
    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`http://localhost:4001/api/todos/${item.id}/`, item)
                .then(res => this.refreshList());
            return;
        }
        axios
            .post("http://localhost:4001/api/todos/", item)
            .then(res => this.refreshList());
    };

    // Rahmen
    render() {
        return (
            <main className="content">
                {/*                <h1 className="text-white text-uppercase text-center my-4">Carsultant Kalender</h1>*/}


                <div className="card p-3">
                    {this.renderTabList()}
                    <ul className="list-group list-group-flush">
                        {this.renderItems()}
                    </ul>
                </div>


                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );
    }
}

export default Events;