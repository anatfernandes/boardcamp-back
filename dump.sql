--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agames; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.agames (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    stock_total integer NOT NULL,
    category_id integer NOT NULL,
    price_per_day integer NOT NULL
);


--
-- Name: agames_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.agames_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: agames_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.agames_id_seq OWNED BY public.agames.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    cpf character varying(11) NOT NULL,
    birthday date NOT NULL
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    "stockTotal" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "pricePerDay" integer NOT NULL
);


--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: rentals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rentals (
    id integer NOT NULL,
    "customerId" integer NOT NULL,
    "gameId" integer NOT NULL,
    "rentDate" date NOT NULL,
    "daysRented" integer NOT NULL,
    "returnDate" date,
    "originalPrice" integer NOT NULL,
    "delayFee" integer
);


--
-- Name: rentals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rentals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rentals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rentals_id_seq OWNED BY public.rentals.id;


--
-- Name: agames id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agames ALTER COLUMN id SET DEFAULT nextval('public.agames_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: rentals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals ALTER COLUMN id SET DEFAULT nextval('public.rentals_id_seq'::regclass);


--
-- Data for Name: agames; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.agames VALUES (1, 'Banco Imobiliário', 'http', 3, 2, 1500);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'investigação');
INSERT INTO public.categories VALUES (2, 'terror');
INSERT INTO public.categories VALUES (3, 'TERROR');
INSERT INTO public.categories VALUES (4, 'aventura');
INSERT INTO public.categories VALUES (5, 'rpg');
INSERT INTO public.categories VALUES (6, 'alegria alegria');
INSERT INTO public.categories VALUES (7, 'Cartas');
INSERT INTO public.categories VALUES (8, 'Banana 3');
INSERT INTO public.categories VALUES (9, 'amigos até o fim');


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.customers VALUES (1, 'João Alfredo', '2199889922', '01234567890', '1992-10-05');
INSERT INTO public.customers VALUES (3, 'saitama', '1234567890', '12345678901', '2000-10-31');
INSERT INTO public.customers VALUES (4, 'Dazai', '1335577001', '01734577890', '2004-03-09');
INSERT INTO public.customers VALUES (8, 'João Alfredo', '2199889922', '11234567890', '3000-01-31');
INSERT INTO public.customers VALUES (9, 'João Alfredo', '2199889922', '11234067890', '3000-01-31');
INSERT INTO public.customers VALUES (10, 'João Alfredo', '2199889922', '11238067890', '3000-01-31');
INSERT INTO public.customers VALUES (11, 'teste', '2123451922', '10678901234', '2000-02-28');
INSERT INTO public.customers VALUES (12, 'teste', '2123451922', '10678901294', '1000-02-03');
INSERT INTO public.customers VALUES (14, 'Novo', '2123451922', '10678901085', '2000-10-27');
INSERT INTO public.customers VALUES (15, 'Cliente novo', '31999994444', '12345678911', '2000-02-08');
INSERT INTO public.customers VALUES (13, 'Novo', '2123451922', '10678901985', '2004-03-09');
INSERT INTO public.customers VALUES (16, 'Anastácia Filandelita', '31123456789', '12345678900', '2004-03-09');
INSERT INTO public.customers VALUES (17, 'Antonietodelapuertaesquierda', '31123456456', '12345678910', '2000-10-31');
INSERT INTO public.customers VALUES (2, 'Kira', '2199889922', '77777197432', '1992-03-31');
INSERT INTO public.customers VALUES (18, 'Andy', '2199889922', '11234567893', '2002-03-09');


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.games VALUES (1, 'Banco Imobiliário', 'http', 3, 2, 1500);
INSERT INTO public.games VALUES (2, 'Jogo Legal', 'http', 3, 2, 1500);
INSERT INTO public.games VALUES (3, 'O Jogo', 'http', 3, 2, 1500);
INSERT INTO public.games VALUES (4, 'Investiga aí!', 'http', 3, 1, 1500);
INSERT INTO public.games VALUES (5, 'novo jogo', 'imagem legal', 10, 4, 1000);
INSERT INTO public.games VALUES (6, 'um NOVO joGo', 'image', 1, 2, 15000);
INSERT INTO public.games VALUES (7, 'Jogo 1', 'image', 1, 2, 15000);
INSERT INTO public.games VALUES (8, 'JoGo 2', 'image', 1, 2, 15000);
INSERT INTO public.games VALUES (9, 'JOGo 3', 'image', 1, 2, 15000);
INSERT INTO public.games VALUES (10, 'JOGO 4', 'image', 1, 2, 15000);
INSERT INTO public.games VALUES (11, 'jogo só', 'image', 1, 2, 15000);
INSERT INTO public.games VALUES (12, 'Jogo da vida', 'imagem bonita', 30, 5, 1500);
INSERT INTO public.games VALUES (13, 'Jogo da vida', 'imagem bonita', 30, 50, 1500);
INSERT INTO public.games VALUES (14, 'Jogo da vida', 'imagem bonita', 30, 50, 1500);
INSERT INTO public.games VALUES (15, 'Jogo da vida', 'imagem bonita', 30, 50, 1500);
INSERT INTO public.games VALUES (16, 'Jogo da vida', 'imagem bonita', 30, 5, 1500);
INSERT INTO public.games VALUES (17, 'Lua brilha brilha', 'imagem bonita', 30, 3, 1500);
INSERT INTO public.games VALUES (18, 'Lua brilha brilha', 'imagem bonita', 30, 300, 1500);
INSERT INTO public.games VALUES (19, 'Lua brilha brilha', 'imagem bonita', 30, 3, 1500);
INSERT INTO public.games VALUES (20, 'Lua brilha não mais', 'imagem bonita', 30, 3, 1500);
INSERT INTO public.games VALUES (21, 'Lua brilha de novo, eba!', 'imagem bonita', 30, 4, 1500);
INSERT INTO public.games VALUES (22, 'ordem normal', 'imagem boa', 2, 4, 1000);
INSERT INTO public.games VALUES (23, 'Jogo do Mico', 'https://static3.tcdn.com.br/img/img_prod/236819/jogo_de_cartas_do_mico_com_aroma_de_banana_copag_4099_1_20200608124543.jpg', 1, 7, 1000);
INSERT INTO public.games VALUES (24, 'Amigos até o fim', 'https://mypartyshirt.com/media/catalog/product/cache/1/image/1000x1231/9df78eab33525d08d6e5fb8d27136e95/c/h/chucky-child-s-play-good-guys-doll.png', 1, 5, 10000);


--
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rentals VALUES (15, 16, 22, '2022-10-02', 1, '2022-10-03', 1000, 1000);
INSERT INTO public.rentals VALUES (16, 18, 24, '2022-10-03', 1, '2022-10-03', 10000, 0);


--
-- Name: agames_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.agames_id_seq', 1, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 9, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_id_seq', 18, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.games_id_seq', 24, true);


--
-- Name: rentals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rentals_id_seq', 16, true);


--
-- Name: agames agames_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agames
    ADD CONSTRAINT agames_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

