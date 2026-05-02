import express from "express";

export const getNotificationList = async (req, res) => {
    try {
        const notifications = await fetch("api/");
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications" });
    }
};