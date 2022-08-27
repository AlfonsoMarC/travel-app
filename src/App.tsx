import React from "react";
import { Provider } from "react-redux";
import AppRouter from "components/AppRouter/AppRouter";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from "styled-components";
import theme from "assets/theme";
import "bootstrap/dist/css/bootstrap.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faFeather,
  faMapMarkerAlt,
  faPlus,
  faImage,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { store } from "./store/index";

library.add(fab, faFeather, faMapMarkerAlt, faPlus, faImage, faTrash);

const TravelApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
};

export default TravelApp;
