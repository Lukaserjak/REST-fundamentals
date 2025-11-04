import express from "express";
import { getCustomerDetail, searchCustomers, upsertCustomer } from "./customers.service";
import { customerPOSTRequestSchema,  } from "../types";
import { getOrdersForCustomer } from "../orders/orders.service";
import { validate } from "../../middleware/validation.middleware";
import { create } from "xmlbuilder2";

export const customersRouter = express.Router();


customersRouter.get("/:id", async(req, res) =>
{
    const id = req.params.id;
    const customer = await getCustomerDetail(id);
    if (customer != null)
    {
        res.json(customer);
    }
    else
    {
        res.status(404).json({message:"Customer not found"})
    }
});

customersRouter.get("/:id/orders", async(req, res) =>
{
    const id = req.params.id;
    const orders = await getOrdersForCustomer(id);
    res.json(orders);
});

customersRouter.get("/search/:query", async(req, res) =>
{
    const query = req.params.query;
    const customer = await searchCustomers(query);
    res.json(customer);
});


customersRouter.post("/", validate(customerPOSTRequestSchema), async(req, res) =>
{
    const data = customerPOSTRequestSchema.parse(req);
    const customer = await upsertCustomer(data.body);
    if(customer != null)
    {
        if (req.headers["accept"] === "application/xml")
        {
            res.status(201).send(create().ele("customer", customer).end());
        }
        else
        {
            res.status(201).json(customer);
        }
    }
    else
    {
        res.status(500).json({message: "Creation failed."});
    }
});
