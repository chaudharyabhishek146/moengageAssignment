"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { format } from "date-fns"
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

const ListsPage = () => {
  const [activeList, setActiveList] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [listToDelete, setListToDelete] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editedListName, setEditedListName] = useState("")
  const [httpCodes, setHttpCodes] = useState({})
  const [activeView, setActiveView] = useState("lists")

  const { lists, loading, fetchLists, updateList, deleteList } = useLists()

  useEffect(() => {
    fetchLists()
  }, [])

  useEffect(() => {
    const fetchHttpCodes = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${API_URL}/codes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        // Convert array to object for easier lookup
        const codesObj = {}
        response.data.forEach((code) => {
          codesObj[code.code] = code.description
        })

        setHttpCodes(codesObj)
      } catch (error) {
        console.error("Error fetching HTTP codes:", error)
      }
    }

    fetchHttpCodes()
  }, [])

  const handleListSelect = (list) => {
    setActiveList(list)
    setActiveView("details")
  }

  const handleDeleteClick = (list) => {
    setListToDelete(list)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!listToDelete) return

    try {
      await deleteList(listToDelete._id)

      if (activeList && activeList._id === listToDelete._id) {
        setActiveList(null)
        setActiveView("lists")
      }

      toast.success("List deleted successfully")
    } catch (error) {
      toast.error("Failed to delete list")
      console.error("Error deleting list:", error)
    } finally {
      setIsDeleteModalOpen(false)
      setListToDelete(null)
    }
  }

  const handleEditClick = (list) => {
    setActiveList(list)
    setEditedListName(list.name)
    setIsEditModalOpen(true)
  }

  const saveEditedList = async () => {
    if (!activeList) return

    if (!editedListName.trim()) {
      toast.error("List name cannot be empty")
      return
    }

    try {
      const updatedList = await updateList(activeList._id, {
        ...activeList,
        name: editedListName,
      })

      setActiveList(updatedList)
      setIsEditModalOpen(false)
      toast.success("List updated successfully")
    } catch (error) {
      toast.error("Failed to update list")
      console.error("Error updating list:", error)
    }
  }

  return (
    <AppLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">My Saved Lists</h1>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading your lists...</p>
          </div>
        ) : lists.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No saved lists yet</h3>
            <p className="text-muted mt-1 mb-4">Go to the search page to create your first list</p>
            <a href="/search" className="btn btn-primary">
              Go to Search
            </a>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex gap-4 mb-6">
              <button
                className={`btn ${activeView === "lists" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveView("lists")}
              >
                Lists
              </button>
              <button
                className={`btn ${activeView === "details" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setActiveView("details")}
                disabled={!activeList}
              >
                {activeList ? `${activeList.name} Details` : "Details"}
              </button>
            </div>

            {activeView === "lists" && (
              <div className="flex flex-wrap gap-4">
                {lists.map((list) => (
                  <div key={list._id} className="card "style={{ width: "18rem" }}>
                    <div className="p-4 pb-3">
                      <h3 className="text-xl font-bold">{list.name}</h3>
                    </div>
                    <div className="p-4 pt-0">
                      <div className="text-sm text-muted mb-2">
                        Created: {format(new Date(list.createdAt), "MMM d, yyyy")}
                      </div>
                      <div className="text-sm mb-2">
                        {list.codes.length} response code{list.codes.length !== 1 ? "s" : ""}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {list.codes.slice(0, 5).map((code) => (
                          <span key={code} className="bg-muted px-2 py-1 rounded text-xs">
                            {code}
                          </span>
                        ))}
                        {list.codes.length > 5 && (
                          <span className="bg-muted px-2 py-1 rounded text-xs">+{list.codes.length - 5} more</span>
                        )}
                      </div>
                    </div>
                    <div className="p-4 pt-0 flex justify-between">
                      <button className="btn btn-outline btn-sm" onClick={() => handleListSelect(list)}>
                        View
                      </button>
                      <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm" onClick={() => handleEditClick(list)}>
                          Edit
                        </button>
                        <button className="btn btn-destructive btn-sm" onClick={() => handleDeleteClick(list)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeView === "details" && activeList && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{activeList.name}</h2>
                    <p className="text-muted">Created on {format(new Date(activeList.createdAt), "MMMM d, yyyy")}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-outline" onClick={() => handleEditClick(activeList)}>
                      Edit List
                    </button>
                    <button className="btn btn-destructive" onClick={() => handleDeleteClick(activeList)}>
                      Delete List
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {activeList.codes.map((code) => (
                    <ResponseCodeCard key={code} code={code} description={httpCodes[code] || "Unknown Status Code"} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          style={modalStyles}
          contentLabel="Delete List"
        >
          <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
          <p className="text-muted mb-4">
            This action cannot be undone. This will permanently delete this list from your account.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-destructive" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </Modal>

        {/* Edit List Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          style={modalStyles}
          contentLabel="Edit List"
        >
          <h2 className="text-xl font-bold mb-4">Edit List</h2>
          <p className="text-muted mb-4">Change the name of your list.</p>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-list-name" className="form-label">
                List Name
              </label>
              <input
                id="edit-list-name"
                className="form-input"
                value={editedListName}
                onChange={(e) => setEditedListName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={saveEditedList}>
              Save Changes
            </button>
          </div>
        </Modal>
      </div>
    </AppLayout>
  )
}

export default ListsPage

