USE DemoDB;
GO
/****** Object:  Database [mubsshir_shop]    Script Date: 29-04-2023 11:53:58 ******/
CREATE DATABASE [mubsshir_shop]

ALTER DATABASE [mubsshir_shop] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [mubsshir_shop].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [mubsshir_shop] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [mubsshir_shop] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [mubsshir_shop] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [mubsshir_shop] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [mubsshir_shop] SET ARITHABORT OFF 
GO
ALTER DATABASE [mubsshir_shop] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [mubsshir_shop] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [mubsshir_shop] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [mubsshir_shop] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [mubsshir_shop] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [mubsshir_shop] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [mubsshir_shop] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [mubsshir_shop] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [mubsshir_shop] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [mubsshir_shop] SET  DISABLE_BROKER 
GO
ALTER DATABASE [mubsshir_shop] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [mubsshir_shop] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [mubsshir_shop] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [mubsshir_shop] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [mubsshir_shop] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [mubsshir_shop] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [mubsshir_shop] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [mubsshir_shop] SET RECOVERY FULL 
GO
ALTER DATABASE [mubsshir_shop] SET  MULTI_USER 
GO
ALTER DATABASE [mubsshir_shop] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [mubsshir_shop] SET DB_CHAINING OFF 
GO
ALTER DATABASE [mubsshir_shop] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [mubsshir_shop] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [mubsshir_shop] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [mubsshir_shop] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'mubsshir_shop', N'ON'
GO
ALTER DATABASE [mubsshir_shop] SET QUERY_STORE = OFF
GO
USE [mubsshir_shop]
GO
/****** Object:  User [mubsshir]    Script Date: 29-04-2023 11:53:58 ******/
CREATE USER [mubsshir] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [admin]    Script Date: 29-04-2023 11:53:58 ******/
CREATE USER [admin] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[admin]
GO
/****** Object:  Schema [admin]    Script Date: 29-04-2023 11:53:58 ******/
CREATE SCHEMA [admin]
GO
/****** Object:  Table [dbo].[L_Cart_Lookup]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[L_Cart_Lookup](
	[CartTblRefID] [int] IDENTITY(1,1) NOT NULL,
	[ProductID] [int] NOT NULL,
	[Qty] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_L_Cart_Lookup] PRIMARY KEY CLUSTERED 
(
	[CartTblRefID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[L_Order_Lookup]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[L_Order_Lookup](
	[OrderTblRefID] [nvarchar](100) NOT NULL,
	[ProductID] [int] NOT NULL,
	[Qty] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[OrderDate] [date] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[L_Product_Lookup]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[L_Product_Lookup](
	[ProductTblRefID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](50) NOT NULL,
	[ProductPrice] [decimal](18, 2) NOT NULL,
	[ProductDesc] [nvarchar](500) NOT NULL,
	[ProductImg] [nvarchar](max) NOT NULL,
	[AdminID] [int] NOT NULL,
 CONSTRAINT [PK_L_Product_Lookup] PRIMARY KEY CLUSTERED 
(
	[ProductTblRefID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[M_User]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[M_User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[resetToken] [nvarchar](max) NULL,
	[tokenExpire] [nvarchar](50) NULL,
 CONSTRAINT [PK_M_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sessions]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sessions](
	[sid] [nvarchar](255) NOT NULL,
	[expires] [datetimeoffset](7) NULL,
	[data] [nvarchar](max) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[sid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_ProductCoverage]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_ProductCoverage](
	[LastUpdateID] [int] NOT NULL,
	[ProductsCount] [int] NOT NULL
) ON [PRIMARY]
GO
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'c11d992b-f4c4-4cc2-be2b-4ccdb5648795', 1, 1, 1, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'27df8aaf-7f06-423a-85a6-d6d457823453', 1, 2, 1, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'27df8aaf-7f06-423a-85a6-d6d457823453', 2, 1, 1, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'27df8aaf-7f06-423a-85a6-d6d457823453', 3, 1, 1, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'27df8aaf-7f06-423a-85a6-d6d457823453', 4, 1, 1, CAST(N'2023-04-17' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'1437c0eb-1d07-40dc-82b7-6e53cd1d19ea', 33, 1, 1, CAST(N'2023-04-18' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'f6f9b0c4-5ee6-4dcd-a6c4-52d96f9852e3', 1, 1, 2, CAST(N'2023-04-18' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'f6f9b0c4-5ee6-4dcd-a6c4-52d96f9852e3', 2, 1, 2, CAST(N'2023-04-18' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'f6f9b0c4-5ee6-4dcd-a6c4-52d96f9852e3', 3, 1, 2, CAST(N'2023-04-18' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'41e5be7b-d036-41f3-99fc-97a996705815', 5, 1, 1, CAST(N'2023-04-18' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'41e5be7b-d036-41f3-99fc-97a996705815', 4, 1, 1, CAST(N'2023-04-18' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'41e5be7b-d036-41f3-99fc-97a996705815', 3, 1, 1, CAST(N'2023-04-18' AS Date))
INSERT [dbo].[L_Order_Lookup] ([OrderTblRefID], [ProductID], [Qty], [UserId], [OrderDate]) VALUES (N'0c11b7ca-96de-4f8b-9309-1534cae46459', 2, 1, 2, CAST(N'2023-04-18' AS Date))
GO
SET IDENTITY_INSERT [dbo].[L_Product_Lookup] ON 

INSERT [dbo].[L_Product_Lookup] ([ProductTblRefID], [ProductName], [ProductPrice], [ProductDesc], [ProductImg], [AdminID]) VALUES (1, N'Cricket Kit', CAST(120.00 AS Decimal(18, 2)), N'Professional Cricket kit for Kids  ', N'images\undefined-cricket.webp', 1)
INSERT [dbo].[L_Product_Lookup] ([ProductTblRefID], [ProductName], [ProductPrice], [ProductDesc], [ProductImg], [AdminID]) VALUES (2, N'Sony Playstation 5', CAST(499.00 AS Decimal(18, 2)), N'Best Gaming Console in the planet            ', N'images\undefined-ps5.webp', 1)
INSERT [dbo].[L_Product_Lookup] ([ProductTblRefID], [ProductName], [ProductPrice], [ProductDesc], [ProductImg], [AdminID]) VALUES (3, N'XBOX ONE', CAST(559.00 AS Decimal(18, 2)), N'XBox : Full Entertainment  System  ', N'images\undefined-xbox.jpeg', 2)
INSERT [dbo].[L_Product_Lookup] ([ProductTblRefID], [ProductName], [ProductPrice], [ProductDesc], [ProductImg], [AdminID]) VALUES (4, N'Graphic Card', CAST(699.00 AS Decimal(18, 2)), N'AMD RTX 5090 TI ,The absolute beast ', N'images\undefined-Graphic.webp', 2)
INSERT [dbo].[L_Product_Lookup] ([ProductTblRefID], [ProductName], [ProductPrice], [ProductDesc], [ProductImg], [AdminID]) VALUES (5, N'Python Machine Learning', CAST(5.00 AS Decimal(18, 2)), N'The 3rd edition of this massive book is now here!   ', N'images\undefined-bookPy.jpeg', 2)
INSERT [dbo].[L_Product_Lookup] ([ProductTblRefID], [ProductName], [ProductPrice], [ProductDesc], [ProductImg], [AdminID]) VALUES (33, N'Nike Air Sneaker', CAST(1500.00 AS Decimal(18, 2)), N'Expensive Sneakers You Wish You Had ', N'images\undefined-shoes.jpg', 1)
INSERT [dbo].[L_Product_Lookup] ([ProductTblRefID], [ProductName], [ProductPrice], [ProductDesc], [ProductImg], [AdminID]) VALUES (60, N'Tom Clancy''s Splinter', CAST(45.00 AS Decimal(18, 2)), N'Tom Clancy''s Splinter Cell: Blacklist ', N'images\Khan-TomClancyBlackLIST.jpg', 1)
INSERT [dbo].[L_Product_Lookup] ([ProductTblRefID], [ProductName], [ProductPrice], [ProductDesc], [ProductImg], [AdminID]) VALUES (63, N'Cricket 19', CAST(49.00 AS Decimal(18, 2)), N'Best Cricket Game of all time ', N'images\Khan-Crick.webp', 1)
SET IDENTITY_INSERT [dbo].[L_Product_Lookup] OFF
GO
SET IDENTITY_INSERT [dbo].[M_User] ON 

INSERT [dbo].[M_User] ([UserID], [email], [password], [resetToken], [tokenExpire]) VALUES (1, N'mmk3045@gmail.com', N'$2a$12$SbvtwZylNKoddGJb03F.9OwSLVtGIdMMcMs1yRpA3IKwUGDNrL5ue', N'dbc4b355b974c977266a1f227eb30705366ba282ac70b7015d0e15f4c8025d97', N'1681902801805')
INSERT [dbo].[M_User] ([UserID], [email], [password], [resetToken], [tokenExpire]) VALUES (2, N'hello@gmail.com', N'$2a$12$K7gcOY5uFuF6RiK1eLPebewUTXEoGa.xv2QQ2t9ePp1UspIdTHE4m', NULL, NULL)
INSERT [dbo].[M_User] ([UserID], [email], [password], [resetToken], [tokenExpire]) VALUES (3, N'tata@gmail.com', N'$2a$12$nXNBTrmKp6zsP9RlI9VSxuzGmW1MnciH4EJDL8KO5BoszQylrMuU.', NULL, NULL)
SET IDENTITY_INSERT [dbo].[M_User] OFF
GO
INSERT [dbo].[Sessions] ([sid], [expires], [data], [createdAt], [updatedAt]) VALUES (N'IAwG9ohos25wUNEq2iJzG-ASSPRL9aKd', CAST(N'2023-04-25T18:55:41.8710000+00:00' AS DateTimeOffset), N'{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"csrfSecret":"cb1XxyozCm_hIU3thGh5QwFb","flash":{}}', CAST(N'2023-04-25T18:33:13.6410000+00:00' AS DateTimeOffset), CAST(N'2023-04-25T18:40:41.8710000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[T_ProductCoverage] ([LastUpdateID], [ProductsCount]) VALUES (63, 8)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_M_User]    Script Date: 29-04-2023 11:53:58 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_M_User] ON [dbo].[M_User]
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[L_Product_Lookup] ADD  CONSTRAINT [DF_L_Product_Lookup_AdminID]  DEFAULT ((0)) FOR [AdminID]
GO
ALTER TABLE [dbo].[L_Cart_Lookup]  WITH CHECK ADD  CONSTRAINT [FK_Product_Cart] FOREIGN KEY([ProductID])
REFERENCES [dbo].[L_Product_Lookup] ([ProductTblRefID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[L_Cart_Lookup] CHECK CONSTRAINT [FK_Product_Cart]
GO
ALTER TABLE [dbo].[L_Order_Lookup]  WITH CHECK ADD  CONSTRAINT [FK_L_Order_Lookup_M_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[M_User] ([UserID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[L_Order_Lookup] CHECK CONSTRAINT [FK_L_Order_Lookup_M_User]
GO
/****** Object:  StoredProcedure [dbo].[USP_AddProduct]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubsshir Khan
-- Create date: 8 March 23
-- Description:	Insert Products In L_Product_Lookup Table
-- =============================================
CREATE PROCEDURE [dbo].[USP_AddProduct]
	-- Add the parameters for the stored procedure here
	@title NVARCHAR(20)
	,@desc NVARCHAR(max)
	,@price FLOAT
	,@img NVARCHAR(max)
	,@uid int
	,@rowAffected INT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- Insert statements for procedure here
	INSERT INTO [L_Product_Lookup]
	VALUES (
		@title
		,@price
		,@desc
		,@img
		,@uid
		);

	SET @rowAffected = @@ROWCOUNT
END
GO
/****** Object:  StoredProcedure [dbo].[USP_AddToCart]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_AddToCart]
	-- Add the parameters for the stored procedure here
	@productId INT, @uid INT, @rowAffected INT = 0 OUTPUT
AS
DECLARE @userCount INT, @productCount INT = 0;

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT @userCount = COUNT(1)
	FROM [L_Cart_Lookup]
	WHERE [UserId] = @uid;

	IF @userCount > 0
	BEGIN
		SELECT @productCount = [ProductID]
		FROM [L_Cart_Lookup]
		WHERE [ProductID] = @productId AND [UserId] = @uid

		IF @productCount > 0
		BEGIN
			UPDATE [L_Cart_Lookup]
			SET Qty = Qty + 1
			WHERE UserId = @uid AND ProductID = @productId
		END
		ELSE
		BEGIN
			INSERT INTO [L_Cart_Lookup]
			VALUES (@productId, 1, @uid);

		END
	END
	ELSE
	BEGIN
		INSERT INTO [L_Cart_Lookup]
		VALUES (@productId, 1, @uid);
	END

	-- Insert statements for procedure here
	SET @rowAffected = @@ROWCOUNT
END
GO
/****** Object:  StoredProcedure [dbo].[USP_Count_Products]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 25 april 23
-- Description:	Products Count
-- =============================================
CREATE   PROCEDURE [dbo].[USP_Count_Products]

AS
Declare @MIN int,@MAX int ,@lastCount int,@newCount int;

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT @MIN= LastUpdateID FROM [mubsshir_shop].[dbo].[T_ProductCoverage] with(Nolock);
	SELECT @MAX= MAX(ProductTblRefID) FROM  [mubsshir_shop].[dbo].[L_Product_Lookup] with(Nolock);

	IF @MAX>@MIN
	BEGIN
		SELECT @lastCount=	ProductsCount  FROM [mubsshir_shop].[dbo].[T_ProductCoverage] with(Nolock);
		SELECT @newCount=COUNT(1) FROM [mubsshir_shop].[dbo].[L_Product_Lookup]  with(Nolock)
		WHERE ProductTblRefID>@MIN;
		
		UPDATE [mubsshir_shop].[dbo].[T_ProductCoverage] SET LastUpdateID=@MAX,ProductsCount=@newCount+@lastCount;
	END
	

END
GO
/****** Object:  StoredProcedure [dbo].[USP_DeleteFromCart]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubsshir Khan
-- Create date: 8 March 23
-- Description:	Adding Products In L_Cart_Lookup Table
-- =============================================
CREATE PROCEDURE [dbo].[USP_DeleteFromCart]
	-- Add the parameters for the stored procedure here
	@cartID INT,@uid int , @rowAffected INT =0 OUTPUT
AS
DECLARE @productCount INT;

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DELETE FROM [L_Cart_Lookup] where CartTblRefID=@cartID and UserId=@uid
	-- Insert statements for procedure here
	SET @rowAffected = @@ROWCOUNT
END
GO
/****** Object:  StoredProcedure [dbo].[USP_DeleteProduct]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 8 March 23
-- Description:	Delete product from L_Product_Lookup
-- =============================================
CREATE PROCEDURE [dbo].[USP_DeleteProduct]
	-- Add the parameters for the stored procedure here
	@id INT, @uid INT, @rowAffected INT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	-- Insert statements for procedure here
	DELETE
	FROM [L_Product_Lookup]
	WHERE ProductTblRefID = @id and AdminID=@uid;
	DELETE FROM [L_Cart_Lookup] where [ProductID]=@id ;

	UPDATE [mubsshir_shop].[dbo].[T_ProductCoverage] SET ProductsCount=ProductsCount-1;
	SET @rowAffected = @@ROWCOUNT
		
END
GO
/****** Object:  StoredProcedure [dbo].[USP_FindProduct]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 8 march 23
-- Description:	Find Product by id
-- =============================================
CREATE PROCEDURE [dbo].[USP_FindProduct] @id INT,@rowAffected INT OUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT * FROM [L_Product_Lookup]
	WHERE [ProductTblRefID] = @id;

	SET @rowAffected = @@ROWCOUNT;
END
GO
/****** Object:  StoredProcedure [dbo].[USP_FindUser]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_FindUser]
	-- Add the parameters for the stored procedure here
	@id INT=-1,@email nvarchar(max)='',
	@rowAffected INT = 0 OUTPUT
AS
DECLARE @AddQuery nvarchar(1000)='' ,@SqlString nvarchar(1000)='';

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	if @email<>''
	begin
		set @AddQuery+='  WHERE email='''+@email+''''
	end
	if @id<>-1
	begin
		set @AddQuery+=' WHERE  UserID='+cast(@id as nvarchar(10))
	end
	if @email<>'' or @id<>-1
	begin
		set @SqlString+= 'SELECT * FROM M_User '+@AddQuery
		print @SqlString
		Exec sp_executesql @SqlString
	end
	SET @rowAffected = @@ROWCOUNT
	print @rowAffected;
END
GO
/****** Object:  StoredProcedure [dbo].[USP_FindUserWithToken]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 15-Apr-2023
-- Description:	Update Products table
-- =============================================
Create   
 PROCEDURE [dbo].[USP_FindUserWithToken] @token NVARCHAR(max), @expire NVARCHAR(max), @rowAffected INT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT UserID
	FROM [M_User]
	WHERE resetToken = @token AND CAST(tokenExpire AS BIGINT) > CAST(@expire AS BIGINT)

	SET @rowAffected = @@ROWCOUNT;
END
GO
/****** Object:  StoredProcedure [dbo].[USP_GetAdminProd]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Mubasshir
-- Create date: 8 march 23
-- Description:	Fetching Products table
-- =============================================
CREATE PROCEDURE [dbo].[USP_GetAdminProd] 
@uid int ,@rowAffected int=0 out
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT * FROM [L_Product_Lookup] where AdminID=@uid;
	SET @rowAffected=@@ROWCOUNT;
END
GO
/****** Object:  StoredProcedure [dbo].[USP_GetCartItems]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubsshir Khan
-- Create date: 8 March 23
-- Description:	Fetch Products from L_Cart_Lookup Table
-- =============================================
CREATE PROCEDURE [dbo].[USP_GetCartItems]
	-- Add the parameters for the stored procedure here
	@uid INT, @rowAffected INT = 0 OUTPUT
AS
DECLARE @productCount INT;

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT [CL].[CartTblRefID] [CartID], [CL].[UserId], [PL].[ProductName], ([PL].[ProductPrice] * [CL].[Qty]) [ProductTotal], [CL].[Qty]
	FROM [L_Cart_Lookup] [CL]
	INNER JOIN [L_Product_Lookup] [PL] ON [CL].[ProductID] = [PL].[ProductTblRefID]
	WHERE [CL].[UserId] = @uid;

	SELECT SUM([PL].[ProductPrice] * [CL].[Qty]) [CartTotal]
	FROM [L_Cart_Lookup] [CL]
	INNER JOIN [L_Product_Lookup] [PL] ON [CL].[ProductID] = [PL].[ProductTblRefID]
	WHERE [CL].[UserId] = @uid;

	-- Insert statements for procedure here
	SET @rowAffected = @@ROWCOUNT
END
GO
/****** Object:  StoredProcedure [dbo].[USP_GetOrders]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 8 march 23
-- Description:	Fetching Order table
-- =============================================
CREATE PROCEDURE [dbo].[USP_GetOrders]
@uid int=0  , @rowAffected int=0 out
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT [OL].[OrderTblRefID] [OrderID], [OL].[UserId],[PL].[ProductName],[PL].[ProductPrice], [OL].[Qty],CAST([OL].[OrderDate] as date) [Date]
	FROM [L_Order_Lookup] [OL]
	JOIN [L_Product_Lookup] [PL] ON [PL].[ProductTblRefID]=[OL].[ProductID]
	WHERE [OL].[UserId]=@uid 

	SELECT [OL].[OrderTblRefID] [OrderID],SUM([PL].[ProductPrice]*[OL].[Qty])[Total]
	FROM [L_Order_Lookup] [OL]
	JOIN [L_Product_Lookup] [PL] ON [OL].[ProductID] = [PL].[ProductTblRefID]
	WHERE [OL].[UserId]=@uid 
	GROUP By  [OL].[OrderTblRefID]


	SET @rowAffected=@@ROWCOUNT
END

GO
/****** Object:  StoredProcedure [dbo].[USP_GetProductCount]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[USP_GetProductCount]
	-- Add the parameters for the stored procedure here
	 @rowAffected INT = 0 OUTPUT
AS
DECLARE @userCount INT, @productCount INT = 0;

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT ProductsCount, CEILING(Cast(ProductsCount as  float)/3) [ProductPerPage] FROM [mubsshir_shop].[dbo].[T_ProductCoverage]
	-- Insert statements for procedure here
	SET @rowAffected = @@ROWCOUNT
END


GO
/****** Object:  StoredProcedure [dbo].[USP_GetProducts]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 8 march 23
-- Description:	Fetching Products table
-- =============================================
CREATE PROCEDURE [dbo].[USP_GetProducts]
@offset int =0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	SELECT *
	FROM [L_Product_Lookup]
	ORDER BY 1 OFFSET @offset ROWS
	FETCH NEXT 3 ROWS ONLY

END
GO
/****** Object:  StoredProcedure [dbo].[USP_GetUserInfo]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubsshir Khan
-- Create date: 8 March 23
-- Description:	send password to server for authentication purpose
-- =============================================

CREATE  PROCEDURE [dbo].[USP_GetUserInfo]	
	-- Add the parameters for the stored procedure here
	@email nvarchar(max),
	@userCount BIT= 0 OUTPUT,
	@rowAffected INT=0	OUT
AS


BEGIN
	SET NOCOUNT ON;
	SELECT @userCount=COUNT(1) FROM M_User where email=@email;
	if @userCount>0
	begin
		SELECT  UserID,password from M_User where email=@email;	
	end
	SET @rowAffected=@@ROWCOUNT;  
END

GO
/****** Object:  StoredProcedure [dbo].[USP_InsertResetToken]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 15-04-2023
-- Description:	Insert Token for reseting password
-- =============================================
CREATE   PROCEDURE [dbo].[USP_InsertResetToken]
	@email NVARCHAR(50)
	,@token nvarchar(max)
	,@expire nvarchar(max)
	,@rowAffected INT OUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE [M_User] SET resetToken=@token ,tokenExpire=@expire where email=@email;
	SET @rowAffected = @@ROWCOUNT;
END
GO
/****** Object:  StoredProcedure [dbo].[USP_MoveToOrder]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_MoveToOrder]
	-- Add the parameters for the stored procedure here
	@orderID nvarchar(max),
	@uid INT,
	@rowAffected INT = 0 OUTPUT
AS
DECLARE @userCount INT,
	@productCount INT = 0;
BEGIN
	SET NOCOUNT ON;

	INSERT INTO L_Order_Lookup (
		OrderTblRefID,
		ProductID,
		Qty,
		UserId,
		OrderDate
		)
	SELECT @orderID, ProductID,
		Qty,
		UserId,
		CAST(SYSDATETIME() AS DATE)
	FROM L_Cart_Lookup
	WHERE UserId = @uid

	DELETE
	FROM L_Cart_Lookup
	WHERE UserId = @uid

	SET @rowAffected = @@ROWCOUNT
END
GO
/****** Object:  StoredProcedure [dbo].[USP_ResetUserPassword]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 15-Apr-2023
-- Description:	Reset user password
-- =============================================
CREATE 

 PROCEDURE [dbo].[USP_ResetUserPassword] @uid INT, @pass NVARCHAR(max), @token NVARCHAR(max), @expire NVARCHAR(max), @rowAffected INT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE [M_User]
	SET password = @pass
	WHERE UserID = @uid AND resetToken = @token AND CAST(tokenExpire AS BIGINT) > CAST(@expire AS BIGINT)

	SET @rowAffected = @@ROWCOUNT;

	IF @rowAffected > 0
	BEGIN
		UPDATE [M_User]
		SET resetToken = NULL ,tokenExpire=NULL
		WHERE UserID = @uid
	END
END
GO
/****** Object:  StoredProcedure [dbo].[USP_SaveUser]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubsshir Khan
-- Create date: 10 March 23
-- Description:	Create new user
-- =============================================

CREATE OR ALTER PROCEDURE [dbo].[USP_SaveUser]	
	-- Add the parameters for the stored procedure here
	@email nvarchar(max),@pass nvarchar(max),
	@rowAffected INT = 0 OUTPUT
AS
DECLARE @productCount INT;

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	Insert into [M_User] (email,password)
		Values(@email,@pass);
	
	SET @rowAffected = @@ROWCOUNT
END
SELECT * FROM [M_User];
GO
/****** Object:  StoredProcedure [dbo].[USP_UpdateProduct]    Script Date: 29-04-2023 11:53:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Mubasshir
-- Create date: 8 march 23
-- Description:	Update Products table
-- =============================================
CREATE PROCEDURE [dbo].[USP_UpdateProduct] @id INT
	,@title NVARCHAR(50)
	,@price INT
	,@img NVARCHAR(max)
	,@desc NVARCHAR(max)
	,@rowAffected INT OUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	UPDATE [L_Product_Lookup]
	SET ProductName = @title
		,ProductDesc = @desc
		,ProductImg = @img
		,ProductPrice = @price
	WHERE [ProductTblRefID] = @id;

	SET @rowAffected = @@ROWCOUNT;
END
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Releation b/w prdouct and cart' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'L_Cart_Lookup', @level2type=N'CONSTRAINT',@level2name=N'FK_Product_Cart'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Relationship b/w user and order' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'L_Order_Lookup', @level2type=N'CONSTRAINT',@level2name=N'FK_L_Order_Lookup_M_User'
GO
USE [master]
GO
ALTER DATABASE [mubsshir_shop] SET  READ_WRITE 
GO
