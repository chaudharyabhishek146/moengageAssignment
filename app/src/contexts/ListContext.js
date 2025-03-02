"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../config"
import { useAuth } from "./AuthContext"

const ListsContext = createContext()

export const useLists = () => useContext(ListsContext)

export const ListsProvider = ({ children }) => {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchLists()
    } else {
      setLists([])
    }
  }, [user])

  const fetchLists = async () => {
    if (!user) return

    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${API_URL}/lists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLists(response.data)
    } catch (error) {
      console.error("Error fetching lists:", error)
    } finally {
      setLoading(false)
    }
  }

  const createList = async (listData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`${API_URL}/lists`, listData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLists([...lists, response.data])
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create list")
    }
  }

  const updateList = async (id, listData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(`${API_URL}/lists/${id}`, listData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLists(lists.map((list) => (list._id === id ? response.data : list)))
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update list")
    }
  }

  const deleteList = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${API_URL}/lists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLists(lists.filter((list) => list._id !== id))
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete list")
    }
  }

  return (
    <ListsContext.Provider
      value={{
        lists,
        loading,
        fetchLists,
        createList,
        updateList,
        deleteList,
      }}
    >
      {children}
    </ListsContext.Provider>
  )
}

