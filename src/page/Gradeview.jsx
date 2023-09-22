import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";

import { useAuthContext } from "./../hook/useAuthcontext";

export default function Gradeview({ ids, fetchTableData, _id }) {
  const { user } = useAuthContext();

  // Set an initial default grade (can be changed as needed)
  const [grade, Setgrade] = useState("N/A"); // Default value

  const [error, setError] = useState("");

  const fetchGrade = () => {
    axios
      .get(`${BASE_API_URL}/grades/${_id}/${ids}`, {
        headers: { Authorization: `Bearer ${user}` },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.grade >= 90 && response.data.grade <= 100) {
          Setgrade("A");
        } else if (response.data.grade >= 80 && response.data.grade < 90) {
          Setgrade("B");
        } else if (response.data.grade >= 70 && response.data.grade < 80) {
          Setgrade("C");
        } else if (response.data.grade >= 60 && response.data.grade < 70) {
          Setgrade("D");
        } else if (response.data.grade >= 0 && response.data.grade < 60) {
          Setgrade("F");
        } else {
          Setgrade("Invalid Grade");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch the grade when the component mounts (empty dependency array)
    fetchGrade();
  }, []);

  const handleRefreshClick = () => {
    // When the user clicks the refresh button, fetch the grade again
    fetchGrade();
  };

  return (
    <div>
      <IconButton onClick={handleRefreshClick} color="primary">
        <EditIcon />
      </IconButton>
      <div style={{ textAlign: "center" }}>
        {grade} {/* Display the grade here */}
      </div>
      {!grade && error !== "" && (
        <div className="col-12">
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </div>
      )}
    </div>
  );
}
