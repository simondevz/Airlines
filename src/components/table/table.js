import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

function TableComponent({ displayData }) {
    const airports = Object.keys(displayData);
    console.log(displayData);

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                stickyHeader={true}
                aria-label="airlines table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell>AIRPORTS</TableCell>
                        <TableCell align="right">TIME</TableCell>

                        {displayData[airports[0]]?.arrivals ||
                        displayData[airports[0]]?.arrivals === 0 ? (
                            <TableCell align="right">Arriving</TableCell>
                        ) : null}

                        {displayData[airports[0]]?.depatures ||
                        displayData[airports[0]]?.depatures === 0 ? (
                            <TableCell align="right">Departing</TableCell>
                        ) : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {airports.map((airport, index) => (
                        <TableRow
                            key={airport}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell >{airport}</TableCell>
                            <TableCell align="right">
                                {displayData[airport].time}
                            </TableCell>

                            {displayData[airport]?.arrivals ||
                            displayData[airport]?.arrivals === 0 ? (
                                <TableCell align="right">
                                    {displayData[airport].arrivals}
                                </TableCell>
                            ) : null}

                            {displayData[airport]?.depatures ||
                            displayData[airport]?.depatures === 0 ? (
                                <TableCell align="right">
                                    {displayData[airport].depatures}
                                </TableCell>
                            ) : null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableComponent;
