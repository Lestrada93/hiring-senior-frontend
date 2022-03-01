import React from 'react';
import { Route, Switch } from "react-router-dom";
import './Core/i18n';
import Header from "./Header";
import ListOfInvoices from "./ListOfInvoices";
import NewInvoice from "./NewInvoice";
import Detail from "./Detail";

function App() {
  return (
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={ListOfInvoices} />
          <Route exact path="/create-a-new-invoice" component={NewInvoice} />
          <Route exact path="/invoice/:id" component={Detail} />
          <Route component={ListOfInvoices} />
        </Switch>
      </div>

  );
}

export default App;
