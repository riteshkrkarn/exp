import React, { useEffect, useState } from "react";
import { deleteTrainer, getTrainers } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

export const TrainerList = () => {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const params = Object.fromEntries(new URLSearchParams(location.search));

  console.log(params);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrainers(params);
      setTrainers(data);
      console.log(data);
    } catch (error) {
      console.error("Error featching trainers", error);
      setError("Failed to fetch trainers. Please try again.");
      // Don't clear the list on error - keep showing previous data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete trainer....!")) {
      try {
        await deleteTrainer(id);
        alert("Trainer data deleted successfully...");
        fetchData();
      } catch (error) {
        console.error("Failed to deleted ...", error);
      }
    }
  };

  return (
    <>
      <div className="pt-5 p-4">
        <h2 className="text-center fw-bold text-success"> Trainers List</h2>

        {error && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        {loading && <div className="text-center p-3">Loading trainers...</div>}

        {!loading && trainers.length === 0 ? (
          <div className="text-center p-3 text-muted">
            No trainers found. Try adding one!
          </div>
        ) : (
          <table className="table table-bordered rounded-2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Tech1</th>
                <th>Tech2</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.location}</td>
                  <td>{t.phone}</td>
                  <td>{t.email}</td>
                  <td>{t.technology1}</td>
                  <td>{t.technology2}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => navigate(`/edit/${t.id}`)}
                    >
                      edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(t.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
