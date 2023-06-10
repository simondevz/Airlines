import { useRef, useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import TableComponent from "../table/table";
import Navbar from "../navbar/navbar";
import "./dashboard.scss";

function Dashboard() {
  const { user, data, time } = useLoaderData();
  const [search, setSearch] = useState("");
  const dataRef = useRef(data);

  const [processedData, setProcessedData] = useState({});
  const [displayData, setDisplayData] = useState({});
  const processedDataRef = useRef(processedData);

  const [menu, setMenu] = useState({
    open: false,
    anchorEl: null,
  });

  const [active, setActive] = useState("all");
  const activeStyle = {
    borderBottom: ".13rem solid black",
  };

  useEffect(() => {
    for (let i = 0; i < dataRef.current.length; i++) {
      let depature = dataRef.current[i].estDepartureAirport;
      let arrival = dataRef.current[i].estArrivalAirport;

      let date = new Date(time * 1000);
      let timeString = `${date.getUTCHours()}:${date.getUTCMinutes()} ${
        date.getUTCHours() < 11 ? "AM" : "PM"
      } UTC`;

      if (depature != null)
        if (processedDataRef.current?.[depature]) {
          processedDataRef.current[depature].depatures++;
        } else {
          processedDataRef.current = {
            ...processedDataRef.current,
            [depature]: {
              depatures: 1,
              arrivals: 0,
              time: timeString,
            },
          };
        }

      if (arrival != null)
        if (processedDataRef.current?.[arrival]) {
          processedDataRef.current[arrival].arrivals++;
        } else {
          processedDataRef.current = {
            ...processedDataRef.current,
            [arrival]: {
              depatures: 0,
              arrivals: 1,
              time: timeString,
            },
          };
        }
    }

    setProcessedData((processedData) => processedDataRef.current);
    setDisplayData((displayData) => processedDataRef.current);
  }, [dataRef, processedDataRef, time]);

  const handleClose = () => setMenu({ open: false, anchorEl: null });

  return (
    <>
      <Navbar />
      <div className="dashboard_text">Welcome Back, {user.username}</div>
      <div className="dashboard">
        <div className="filter_div">
          <Button
            size="small"
            style={active === "all" ? activeStyle : null}
            onClick={() => {
              setDisplayData(processedData);
              setActive("all");
            }}
          >
            All
          </Button>

          <Button
            size="small"
            style={active === "arriving" ? activeStyle : null}
            onClick={() => {
              let temp = {};
              for (let airport in processedData) {
                if (processedData[airport].arrivals > 0)
                  temp = {
                    ...temp,
                    [airport]: {
                      time: processedData[airport].time,
                      arrivals: processedData[airport].arrivals,
                    },
                  };
              }
              setDisplayData(temp);
              setActive("arriving");
            }}
          >
            Arriving
          </Button>

          <Button
            size="small"
            style={active === "departing" ? activeStyle : null}
            onClick={() => {
              let temp = {};
              for (let airport in processedData) {
                if (processedData[airport].depatures > 0)
                  temp = {
                    ...temp,
                    [airport]: {
                      time: processedData[airport].time,
                      depatures: processedData[airport].depatures,
                    },
                  };
              }
              setDisplayData(temp);
              setActive("departing");
            }}
          >
            Departing
          </Button>
        </div>

        <div className="search_div">
          <div className="filter">
            <Button
              size="small"
              color="inherit"
              className="filter_button"
              onClick={(event) =>
                setMenu({
                  ...menu,
                  open: !menu.open,
                  anchorEl: menu.open ? null : event.target,
                })
              }
            >
              <FilterListIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={menu.anchorEl}
              open={menu.open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  let keys = Object.keys(processedData);
                  let temp = {};
                  keys.sort();

                  for (let i = 0; i < keys.length; i++) {
                    temp = {
                      ...temp,
                      [keys[i]]: processedData[keys[i]],
                    };
                  }
                  setDisplayData(temp);
                  setActive("all");
                  handleClose();
                }}
              >
                A - Z
              </MenuItem>

              <MenuItem
                onClick={() => {
                  let keys = Object.keys(processedData);
                  let temp = {};
                  keys.sort().reverse();

                  for (let i = 0; i < keys.length; i++) {
                    temp = {
                      ...temp,
                      [keys[i]]: processedData[keys[i]],
                    };
                  }
                  setDisplayData(temp);
                  setActive("all");
                  handleClose();
                }}
              >
                Z - A
              </MenuItem>
            </Menu>
          </div>

          <TextField
            placeholder="Search"
            className="search"
            size="small"
            onChange={(event) => {
              let entry = event.target.value.toUpperCase();
              setSearch(entry);

              let keys = Object.keys(processedData);
              let temp = {};
              keys.sort();

              for (let i = 0; i < keys.length; i++) {
                if (keys[i].startsWith(entry))
                  temp = {
                    ...temp,
                    [keys[i]]: processedData[keys[i]],
                  };
              }
              setDisplayData(temp);
              setActive("all");
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={search}
          />
        </div>
      </div>
      <TableComponent displayData={displayData} />
      <Outlet />
    </>
  );
}

export default Dashboard;
