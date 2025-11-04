


export enum OrdersPremissions
{
    Read = "read:orders",
    Write = "write:orders",
    Create = "create:orders",
    Read_single = "read:orders-single"
}

export enum ItemsPremissions
{
    Write = "write:items",
    Create = "create:items"
}

export enum CustomersPremissions
{
    Read = "read:customers",
    Read_Single = "read:customers-single",
    Write = "write:customers",
    Create = "create:customers"
}

export enum SecurityPremissions
{
    Deny = "deny:not-assigned"
}