import express from "express";
import { addOrderItems, deleteOrderItem, getOrderDetail, getOrders, upsertOrder } from "./orders.service";
import { validate } from "../../middleware/validation.middleware";
import { idItemIdUUIDRequestSchema, idUUIDRequestSchema, orderItemsDTORequestSchema, orderPUTRequestSchema, pagingRequestSchema } from "../types";

export const ordersRouter = express.Router();



ordersRouter.get("/", validate(pagingRequestSchema), async(req, res) =>
{
    const data = pagingRequestSchema.parse(req);
    const orders = await getOrders(data.query.skip, data.query.take); 
    res.json(orders);
});


ordersRouter.get("/:id", validate(idUUIDRequestSchema), async(req, res) =>
{
    const data = idUUIDRequestSchema.parse(req);
    const order = await getOrderDetail(data.params.id);
    if (order != null)
    {
        res.json(order);
    }
    else
    {
        res.status(400).json({message: "Order not found." });
    }
});

ordersRouter.post("/:id/items", validate(orderItemsDTORequestSchema), async(req, res) =>
{
    const data = orderItemsDTORequestSchema.parse(req);
    const order = await addOrderItems(data.params.id, data.body);
    
    if(data != null)
    {
        res.status(201).json(order);
    }
    else
    {
        res.status(500).json({message: "Addition failed"});
    }


}
);



ordersRouter.delete("/:id/items/:itemId", validate(idItemIdUUIDRequestSchema), async(req, res) =>
{
    const data = idItemIdUUIDRequestSchema.parse(req);
    const order = await deleteOrderItem(data.params.id, data.params.itemId);
    if (order != null)
    {
        res.json(order);
    }
    else
    {
        res.status(404).json({message: "Order or item not found."});
    }
});


ordersRouter.put("/:id", validate(orderPUTRequestSchema), async(req, res) =>
{
    const data = orderPUTRequestSchema.parse(req);
    const orderData = {customerId: "", ...data.body};
    const order = await upsertOrder(orderData, data.params.id);
    if (order != null)
    {
        res.json(order);
    }
    else
    {
        res.status(404).json({message: "Order or item not found."});
    }
})


