import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from "assets/theme";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import {
  faFeather,
  faMapMarkerAlt,
  faPlus,
  faImage,
  faTrash,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { store } from "./store/index";

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  library.add(
    fab,
    faFeather,
    faMapMarkerAlt,
    faPlus,
    faImage,
    faTrash,
    faEllipsisH
  );
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

const customRender = (ui, { route = "/" } = {}, options) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
