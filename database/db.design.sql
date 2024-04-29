CREATE TABLE [User]
(
  [Id] nvarchar(255) PRIMARY KEY,
  [Username] nvarchar(255) UNIQUE NOT NULL,
  [Password] nvarchar(255) NOT NULL,
  [Status] int DEFAULT (0),
  [Role] int DEFAULT (3)
)
GO

CREATE TABLE [Employee]
(
  [Id] nvarchar(255) PRIMARY KEY,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Gender] int NOT NULL,
  [DoB] date NOT NULL,
  [Phone] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) UNIQUE NOT NULL,
  [Address] nvarchar(max) NOT NULL,
  [OptIn] date,
  [OptOut] date,
  [User] nvarchar(255) UNIQUE
)
GO

CREATE TABLE [Customers]
(
  [Id] nvarchar(255) PRIMARY KEY,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Gender] int NOT NULL,
  [DoB] date NOT NULL,
  [Phone] nvarchar(255) NOT NULL,
  [Email] nvarchar(255),
  [Address] nvarchar(max) NOT NULL,
  [Rank] int,
  [Point] float,
  [User] nvarchar(255) UNIQUE
)
GO

CREATE TABLE [Cart]
(
  [Customer] nvarchar(255) NOT NULL,
  [Product] nvarchar(255) NOT NULL,
  [Quantity] int
)
GO

CREATE TABLE [Products]
(
  [Id] nvarchar(255) PRIMARY KEY,
  [Name] nvarchar(255),
  [Des] nvarchar(max),
  [Price] float,
  [Stock] int,
  [Data] nvarchar(max),
  [Images] nvarchar(max),
  [Category] nvarchar(255)
)
GO

CREATE TABLE [Tags]
(
  [Id] nvarchar(255) PRIMARY KEY,
  [Name] nvarchar(255),
  [Category] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Categories]
(
  [Id] nvarchar(255) PRIMARY KEY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [ProductTags]
(
  [Product] nvarchar(255) NOT NULL,
  [Tag] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Orders]
(
  [Id] nvarchar(255) PRIMARY KEY,
  [Customer] nvarchar(255) NOT NULL,
  [Address] nvarchar(255) NOT NULL,
  [Status] int,
  [Additional_fee] float,
  [Total] float,
  [Breakdown] nvarchar(max)
)
GO

CREATE TABLE [OrderDetails]
(
  [OrderID] nvarchar(255) NOT NULL,
  [Product] nvarchar(255) NOT NULL,
  [Quantity] int
)
GO

CREATE INDEX [IX_Cart_Customer] ON [Cart] ("Customer")
GO

CREATE INDEX [IX_Cart_Product] ON [Cart] ("Product")
GO

CREATE INDEX [IX_ProductTags_Product] ON [ProductTags] ("Product")
GO

CREATE INDEX [IX_ProductTags_Tag] ON [ProductTags] ("Tag")
GO

CREATE INDEX [IX_OrderDetails_Order] ON [OrderDetails] ("OrderID")
GO

CREATE INDEX [IX_OrderDetails_Product] ON [OrderDetails] ("Product")
GO

ALTER TABLE [Employee] ADD FOREIGN KEY ([User]) REFERENCES [User] ([Id]) ON DELETE SET NULL ON UPDATE CASCADE
GO

ALTER TABLE [Customers] ADD FOREIGN KEY ([User]) REFERENCES [User] ([Id]) ON DELETE SET NULL ON UPDATE CASCADE
GO

ALTER TABLE [Cart] ADD FOREIGN KEY ([Customer]) REFERENCES [Customers] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [Cart] ADD FOREIGN KEY ([Product]) REFERENCES [Products] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [Products] ADD FOREIGN KEY ([Category]) REFERENCES [Categories] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [ProductTags] ADD FOREIGN KEY ([Product]) REFERENCES [Products] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [ProductTags] ADD FOREIGN KEY ([Tag]) REFERENCES [Tags] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [Orders] ADD FOREIGN KEY ([Customer]) REFERENCES [Customers] ([Id]) ON DELETE NO ACTION ON UPDATE CASCADE
GO

ALTER TABLE [OrderDetails] ADD FOREIGN KEY ([OrderID]) REFERENCES [Orders] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [OrderDetails] ADD FOREIGN KEY ([Product]) REFERENCES [Products] ([Id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [Tags] ADD FOREIGN KEY ([Category]) REFERENCES [Categories] ([Id])
GO