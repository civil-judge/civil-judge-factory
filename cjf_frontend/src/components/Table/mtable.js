import React from "react";
import MaterialTable from "material-table";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme) => ({
  table: {
    "& tfoot tr td div:nth-child(1)": {
      display: "flex",
      justifyContent: "left",
    },
  },
}));
export default function MTableComponent(props) {
  const classes = useStyles();
  return (
    props.data && (
      <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}
        // actions={props.actions}
        options={{
          exportButton: true,
        }}
        components={{
          // Container: (props) => <Paper {...props} className={classes.table} />,
          Pagination: (props) => (
            <TablePagination {...props} className={classes.table} />
          ),
        }}
        editable={props.editable}
      />
    )
  );
}
