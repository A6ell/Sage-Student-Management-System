import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";

export default function Grade({ ids, _id }) {
  const [grades, setGrades] = useState([]);

  const handleAddGrade = (courseId, grade) => {
    axios
      .post(`${BASE_API_URL}/grades/${_id}/${ids}`, {
        studentId: _id,
        courseId,
        grade,
      })
      .then((response) => {
        const updatedGrades = [...grades];
        updatedGrades.push(response.data);
        setGrades(updatedGrades);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleGradeChange = (index, e) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = e.target.value;
    setGrades(updatedGrades);
  };

  return (
    <div>
      {ids.map((id, index) => (
        <div key={id}>
          <TextField
            label={`Course ${index + 1} Grade`}
            value={grades[index] || ""}
            onChange={(e) => handleGradeChange(index, e)}
          />
          <Button
            variant="outlined"
            onClick={() => handleAddGrade(id, grades[index])}
          >
            Add Grade
          </Button>
        </div>
      ))}
    </div>
  );
}