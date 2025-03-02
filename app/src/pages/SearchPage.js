"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { API_URL } from "../config"
import AppLayout from "../components/AppLayout"
import ResponseCodeCard from "../components/CodeCard"
import { useLists } from "../contexts/ListContext"
import Modal from "react-modal"

// Set app element for accessibility
Modal.setAppElement("#root")

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "90%",
    padding: "2rem",
    borderRadius: "var(--radius)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}

const SearchPage = () => {
  const [filter, setFilter] = useState("")
  const [httpCodes, setHttpCodes] = useState([])
  const [filteredCodes, setFilteredCodes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [listName, setListName] = useState("")

  const { createList } = useLists()

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const token = localStorage.getItem("token")
        console.log("token ",token)
        const response = await axios.get(`${API_URL}/codes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setHttpCodes(response.data)
        setFilteredCodes(response.data)
      } catch (error) {
        console.error("Error fetching HTTP codes:", error)
        toast.error("Failed to load HTTP codes")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCodes()
  }, [])

  useEffect(() => {
    if (filter === "") {
      setFilteredCodes(httpCodes)
      return
    }

    const regex = new RegExp(`^${filter.replace(/x/gi, "\\d")}$`)

    const filtered = httpCodes.filter((code) => regex.test(code.code.toString()))

    setFilteredCodes(filtered)
  }, [filter, httpCodes])

  const handleSaveList = async () => {
    if (!listName.trim()) {
      toast.error("Please enter a name for your list")
      return
    }

    try {
      await createList({
        name: listName,
        codes: filteredCodes.map((code) => code.code),
      })

      toast.success("List saved successfully")
      setIsModalOpen(false)
      setListName("")
    } catch (error) {
      toast.error("Failed to save list")
      console.error("Error saving list:", error)
    }
  }

  return (
    <AppLayout>
      <div className="container py-6">
        <div>
          <h1 className="text-3xl font-bold">Search HTTP Response Codes</h1>
          <p className="text-muted">
            Search for HTTP response codes and save them to your lists. Use 'x' as a wildcard (e.g., 2xx for all 200
            codes).
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="filter" className="form-label">
                Filter Codes
              </label>
              <input
                id="filter"
                className="form-input mt-1"
                placeholder="e.g., 404, 2xx, 30x"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary"
                disabled={filteredCodes.length === 0}
              >
                Save Current List
              </button>
            </div>
          </div>

          <div className="text-sm">
            Found {filteredCodes.length} matching response code{filteredCodes.length !== 1 ? "s" : ""}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading HTTP codes...</p>
          </div>
        ) : (
          <>
        
            <div className="flex flex-wrap gap-4">
              {filteredCodes.map((code) => (
                <ResponseCodeCard key={code.code} code={code.code} description={code.description} />
              ))}
            </div>

            {filteredCodes.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No matching response codes</h3>
                <p className="text-muted mt-1">Try a different filter</p>
              </div>
            )}
          </>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={modalStyles}
          contentLabel="Save List"
        >
          <h2 className="text-xl font-bold mb-4">Save List</h2>
          <p className="text-muted mb-4">Give your list a name to save it to your collection.</p>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="list-name" className="form-label">
                List Name
              </label>
              <input
                id="list-name"
                className="form-input"
                placeholder="My HTTP Codes"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </div>
            <div>
              <p className="text-sm text-muted">
                This list will contain {filteredCodes.length} response code{filteredCodes.length !== 1 ? "s" : ""}.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSaveList}>
              Save List
            </button>
          </div>
        </Modal>
      </div>
    </AppLayout>
  )
}

export default SearchPage

