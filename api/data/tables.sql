-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-01-2021 a las 23:10:47
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veski`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `id` int(8) NOT NULL,
  `id_client` int(8) NOT NULL,
  `associateacount` int(60) DEFAULT NULL,
  `cvu` varchar(22) DEFAULT NULL,
  `code` varchar(10) NOT NULL,
  `balance` int(60) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`id`, `id_client`, `associateacount`, `cvu`, `code`, `balance`) VALUES
(1, 3, NULL, NULL, 'e3b0c44298', 50),
(2, 4, NULL, NULL, 'e3b0c44298', 98770),
(3, 5, NULL, NULL, 'e3b0c44298', 1000),
(4, 6, NULL, NULL, 'e3b0c44298', 0),
(5, 7, NULL, NULL, 'e3b0c44298', 1330),
(6, 8, NULL, NULL, 'e3b0c44298', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `cardtype` varchar(50) NOT NULL,
  `bankname` varchar(60) NOT NULL,
  `number` int(15) NOT NULL,
  `securitycode` int(8) DEFAULT NULL,
  `expirationdate` date NOT NULL,
  `id_acc` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `birthdate` date NOT NULL,
  `cellphone` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `street` varchar(60) NOT NULL,
  `city` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `client`
--

INSERT INTO `client` (`id`, `username`, `password`, `first_name`, `last_name`, `birthdate`, `cellphone`, `dni`, `street`, `city`) VALUES
(2, 'tuvieja@admin.com', '$2b$10$iYSXgoJTk/h42ePKG.snfeLR88dhbS3g6wD1z7cVYilJn97ImMori', 'Franco', 'Etcheverri', '1998-07-19', 1536835976, 41471321, 'Santa Fe 4515', 'caba'),
(3, 'tuvieja@admin.com', '$2b$10$21XCeSRWdtgbsRLUtuxBv.B77A/ZsiE/r0AF64IR7BIUZTpE3npSq', 'Franco', 'Etcheverri', '1998-07-19', 1536835976, 41471320, 'Santa Fe 4515', 'caba'),
(4, 'santiagolopezcane@gmail.com', '$2b$10$e1WqwZrkJMVHHAGWY10uPu4HG4ybIkBRdkn1fKBOA/oEcNM0u9qe.', 'santiago', 'lopez cane', '0000-00-00', 1536835976, 41471665, 'santa fe 4515', 'caba'),
(5, 'lires.matiash@gmail.com', '$2b$10$XeP8VReP/gasT.kXVGiAhu6TtWanDK7RKm3IN4sI/8pk0khaam05G', 'matias', 'lires', '1996-08-08', 152245477, 39852111, 'Aguero 1222', 'caba'),
(6, 'camilaff94@gmail.com', '$2b$10$BbBzyj8bOJjdijMWOFpAb.r4DrF9vFguPLdLuG4t04ewYfAapgH.q', 'Camila', 'Fernandez', '1995-10-10', 1566666666, 38123210, 'Callao 100', 'caba'),
(7, 'nahuelmartinc@gmail.com', '$2b$10$75A9cUvm8X5tMchE9GIf/.irq35Pba0utcVzL7LqW4A9/7V5R4CTy', 'Nahuel', 'Caputto', '1992-03-03', 1598989898, 36323232, 'Peron 200', 'caba'),
(8, 'delfinalago@gmail.com', '$2b$10$LD0E4pER2X9yGVRdP27P9.jflHcVUERBBvpxZTQeMW3FKApBrNu2S', 'Delfina', 'Lago', '1995-05-18', 1543434343, 38545454, 'ciudad de la paz 1200', 'caba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(8) NOT NULL,
  `id_contact` int(60) NOT NULL,
  `alias` varchar(60) NOT NULL,
  `id_cli` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `id_contact`, `alias`, `id_cli`) VALUES
(1, 8, 'Delfi Henry', 4),
(2, 7, 'Nahuel', 4),
(5, 4, 'Santi', 7),
(6, 6, 'Camilita', 2),
(7, 2, 'Franquito', 6),
(10, 7, 'La Nona', 6),
(16, 4, 'Santi', 6),
(17, 5, 'Mati', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transactions`
--

CREATE TABLE `transactions` (
  `id` int(60) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `state` int(60) NOT NULL,
  `type` varchar(60) NOT NULL,
  `description` varchar(60) DEFAULT NULL,
  `amount` int(60) NOT NULL,
  `origin` int(60) DEFAULT NULL,
  `destiny` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `transactions`
--

INSERT INTO `transactions` (`id`, `date`, `state`, `type`, `description`, `amount`, `origin`, `destiny`) VALUES
(1, '2021-01-06 21:48:59', 1, 'transferencia', 'te mando lo que me falto del asado', 750, 4, 5),
(2, '2021-01-06 21:48:59', 1, 'transferencia', 'aca va una ayuda para tu viaje', 50, 3, 4),
(4, '2021-01-06 21:48:59', 1, 'transferencia', '50 pe?, deja, quedatelos', 50, 4, 3),
(7, '2020-11-19 21:50:34', 12, 'egreso', 'pago de cuentas', 1500, 4, 5),
(8, '2020-11-19 21:51:58', 10, 'Egreso', 'pagos', 750, 4, 6),
(9, '2020-12-23 21:53:06', 1, 'info', 'envio', 100, 4, 7),
(10, '2020-12-31 21:54:11', 19, 'saldo', 'envio de dinero ', 1000, 4, 8),
(11, '2021-01-01 21:57:01', 1, 'transf', ' paga la mutual', 1500, 4, 3),
(12, '2020-12-01 21:57:54', 1, 'transferencia', 'compra del super', 1500, 4, 5),
(13, '2020-12-23 21:59:11', 1, 'egreso', 'pagos', 1000, 4, 5),
(14, '2020-10-10 21:59:51', 1, 'Egreso', 'envio', 750, 4, 7),
(15, '2020-10-10 22:03:40', 1, 'egreso', 'regalo de cumple', 1000, 4, 5),
(16, '2020-11-24 22:05:22', 1, 'egreso', 'pagos', 1550, 4, 3),
(17, '2020-10-20 22:08:27', 1, 'egreso', 'comida para el gato compra', 750, 4, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD UNIQUE KEY `id_client` (`id_client`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_acc` (`id_acc`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cli-cli` (`id_cli`),
  ADD KEY `cont-cli` (`id_contact`);

--
-- Indices de la tabla `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `acc-transd` (`destiny`),
  ADD KEY `acc-trans` (`origin`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `user-cuent` FOREIGN KEY (`id_client`) REFERENCES `client` (`id`);

--
-- Filtros para la tabla `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `tarj - cuenta` FOREIGN KEY (`id_acc`) REFERENCES `accounts` (`id`);

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `cont-cli` FOREIGN KEY (`id_contact`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `cont-cont` FOREIGN KEY (`id_cli`) REFERENCES `client` (`id`);

--
-- Filtros para la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `acc-trans` FOREIGN KEY (`origin`) REFERENCES `accounts` (`id_client`),
  ADD CONSTRAINT `acc-transd` FOREIGN KEY (`destiny`) REFERENCES `accounts` (`id_client`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
