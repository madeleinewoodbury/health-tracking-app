--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_nationality_fkey";
ALTER TABLE ONLY public."UserSymptomLog" DROP CONSTRAINT "UserSymptomLog_userId_fkey";
ALTER TABLE ONLY public."UserSymptomLog" DROP CONSTRAINT "UserSymptomLog_locationId_fkey";
ALTER TABLE ONLY public."UserSymptomEntry" DROP CONSTRAINT "UserSymptomEntry_symptomId_fkey";
ALTER TABLE ONLY public."UserSymptomEntry" DROP CONSTRAINT "UserSymptomEntry_logId_fkey";
ALTER TABLE ONLY public."ProviderProfile" DROP CONSTRAINT "ProviderProfile_providerId_fkey";
ALTER TABLE ONLY public."ProviderProfile" DROP CONSTRAINT "ProviderProfile_locationId_fkey";
ALTER TABLE ONLY public."Location" DROP CONSTRAINT "Location_countryId_fkey";
ALTER TABLE ONLY public."ActivityLog" DROP CONSTRAINT "ActivityLog_userId_fkey";
ALTER TABLE ONLY public."ActivityLog" DROP CONSTRAINT "ActivityLog_locationId_fkey";
DROP INDEX public."User_username_key";
DROP INDEX public."User_email_key";
DROP INDEX public."Symptom_name_key";
DROP INDEX public."ProviderProfile_providerId_key";
DROP INDEX public."Location_latitude_longitude_key";
DROP INDEX public."Location_city_state_countryId_key";
DROP INDEX public."Country_name_key";
DROP INDEX public."Country_alpha2_key";
DROP INDEX public."Country_alpha2_idx";
ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
ALTER TABLE ONLY public."UserSymptomLog" DROP CONSTRAINT "UserSymptomLog_pkey";
ALTER TABLE ONLY public."UserSymptomEntry" DROP CONSTRAINT "UserSymptomEntry_pkey";
ALTER TABLE ONLY public."Symptom" DROP CONSTRAINT "Symptom_pkey";
ALTER TABLE ONLY public."ProviderProfile" DROP CONSTRAINT "ProviderProfile_pkey";
ALTER TABLE ONLY public."Location" DROP CONSTRAINT "Location_pkey";
ALTER TABLE ONLY public."Country" DROP CONSTRAINT "Country_pkey";
ALTER TABLE ONLY public."ActivityLog" DROP CONSTRAINT "ActivityLog_pkey";
DROP TABLE public._prisma_migrations;
DROP TABLE public."UserSymptomLog";
DROP TABLE public."UserSymptomEntry";
DROP TABLE public."User";
DROP TABLE public."Symptom";
DROP TABLE public."ProviderProfile";
DROP TABLE public."Location";
DROP TABLE public."Country";
DROP TABLE public."ActivityLog";
DROP TYPE public."Role";
DROP TYPE public."Gender";
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Gender" AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);


ALTER TYPE public."Gender" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'PROVIDER',
    'USER'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ActivityLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ActivityLog" (
    id text NOT NULL,
    "userId" text NOT NULL,
    role character varying(50) NOT NULL,
    "ipAddress" character varying(50),
    "locationId" text,
    "recordedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    endpoint character varying(100) NOT NULL,
    method character varying(10) NOT NULL
);


ALTER TABLE public."ActivityLog" OWNER TO postgres;

--
-- Name: Country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Country" (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    alpha2 character varying(2) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Country" OWNER TO postgres;

--
-- Name: Location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Location" (
    id text NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100),
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "countryId" text NOT NULL
);


ALTER TABLE public."Location" OWNER TO postgres;

--
-- Name: ProviderProfile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProviderProfile" (
    id text NOT NULL,
    "providerId" text NOT NULL,
    specialty character varying(50) NOT NULL,
    "locationId" text NOT NULL,
    title character varying(50),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL
);


ALTER TABLE public."ProviderProfile" OWNER TO postgres;

--
-- Name: Symptom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Symptom" (
    id text NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Symptom" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    age integer NOT NULL,
    gender public."Gender" NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    nationality text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserSymptomEntry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserSymptomEntry" (
    "logId" text NOT NULL,
    "symptomId" text NOT NULL,
    severity integer,
    "symptomStart" timestamp(3) without time zone,
    "symptomEnd" timestamp(3) without time zone,
    description text
);


ALTER TABLE public."UserSymptomEntry" OWNER TO postgres;

--
-- Name: UserSymptomLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserSymptomLog" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "locationId" text NOT NULL,
    "recordedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UserSymptomLog" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: ActivityLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ActivityLog" (id, "userId", role, "ipAddress", "locationId", "recordedAt", endpoint, method) FROM stdin;
fdf2ed57-62f6-41f7-9e5b-ebb3617c3181	1d1052bd-73eb-4091-9ffa-11c3b760cd6a	USER	::1	\N	2024-12-04 00:16:08.146	/api/user-symptom-log	GET
b2e781f5-d9c0-438d-975e-a918cbe816a3	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-12-04 00:20:09.299	/api/user-symptom-log	POST
03114e8b-e9e0-4cb9-9e13-e377fa223405	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-12-01 00:20:09.353	/api/user-symptom-log	GET
2f7f2aaf-ba02-419c-abc7-2c5e52a92234	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-11-30 00:19:29.062	/api/symptom	GET
709dc991-5e92-4893-800d-18f8d77b7ada	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-11-29 00:20:09.375	/api/user-symptom-log	GET
f489c93d-6206-490a-9d6c-4b080c1da704	1d1052bd-73eb-4091-9ffa-11c3b760cd6a	USER	::1	\N	2024-12-04 00:17:02.998	/api/user-symptom-log	POST
995c175c-100d-4f03-ab24-2d3a1a448e0d	416a7690-c78e-48fe-b838-7d52a6c9bb6e	USER	::1	\N	2024-12-04 00:17:50.139	/api/symptom	GET
98d5a254-9ed6-4808-b1d1-ac0edd8e798d	416a7690-c78e-48fe-b838-7d52a6c9bb6e	USER	::1	\N	2024-12-04 00:19:02.449	/api/user-symptom-log	POST
a9bd38a0-940c-46a0-b8f3-cc1a3fc9cfeb	416a7690-c78e-48fe-b838-7d52a6c9bb6e	USER	::1	\N	2024-12-04 00:19:03.276	/api/user-symptom-log	GET
fdb95885-a3cb-4e51-a79f-4470e2597e77	416a7690-c78e-48fe-b838-7d52a6c9bb6e	USER	::1	\N	2024-12-04 00:19:06.19	/api/symptom	GET
85fc5c7e-7d41-43f7-ae47-4c61de7be78c	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-12-04 00:20:10.653	/api/symptom	GET
a5d0b13a-a7fa-4a8a-a0e9-a750c43c5a91	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-12-04 00:20:34.815	/api/user-symptom-log	POST
dd8d555d-6d87-48a5-b241-73c5b23e0d29	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-12-04 00:20:34.872	/api/user-symptom-log	GET
0e9c18fd-09a5-44c1-a6c6-5fd52528f1e1	1d1052bd-73eb-4091-9ffa-11c3b760cd6a	USER	::1	\N	2024-11-25 00:17:03.965	/api/user-symptom-log	GET
0f56494c-65cf-41aa-ace0-b2cd246c866d	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-11-25 00:19:27.926	/api/user-symptom-log	GET
2c1f6062-b865-4e3e-8e8f-19a016b5879b	416a7690-c78e-48fe-b838-7d52a6c9bb6e	USER	::1	\N	2024-11-30 00:17:48.819	/api/user-symptom-log	GET
2e92d396-4cfb-4297-be0c-0302a8ea3c83	416a7690-c78e-48fe-b838-7d52a6c9bb6e	USER	::1	\N	2024-11-30 00:19:03.261	/api/user-symptom-log	GET
3eff463a-a6d1-4cd9-9b7d-865dbc3ed36a	928e323d-a9da-41e2-a69a-21d8410c5d0f	USER	::1	\N	2024-11-30 00:20:51.769	/api/user-symptom-log	GET
518ee85b-5023-49e2-b94b-17d6460dd429	8d81ea24-916c-4bef-8751-4f3cb246ba29	USER	::1	\N	2024-12-01 00:20:34.895	/api/user-symptom-log	GET
59b2967c-5934-4d71-9cfc-b8fbe8dbe33e	1d1052bd-73eb-4091-9ffa-11c3b760cd6a	USER	::1	\N	2024-12-02 00:16:09.434	/api/symptom	GET
5da5dc92-2041-4f5a-bed8-bcc5140633bd	928e323d-a9da-41e2-a69a-21d8410c5d0f	USER	::1	\N	2024-12-02 00:20:52.689	/api/symptom	GET
66114112-a357-4c32-8e5e-6f2aff566d02	1d1052bd-73eb-4091-9ffa-11c3b760cd6a	USER	::1	\N	2024-11-20 00:17:04.011	/api/user-symptom-log	GET
b711fd4b-6ec1-4fad-b389-96250e9aeb80	928e323d-a9da-41e2-a69a-21d8410c5d0f	USER	::1	\N	2024-12-04 00:21:45.521	/api/user-symptom-log	POST
fd6bd9eb-7eaa-4980-a130-dce05d155ab3	928e323d-a9da-41e2-a69a-21d8410c5d0f	USER	::1	\N	2024-12-04 00:21:46.38	/api/user-symptom-log	GET
bea2e993-8953-4e4c-99df-f4e0a017e185	e5554595-88a5-4b10-a2b7-a043760b9e7f	USER	::1	\N	2024-12-04 00:22:07.125	/api/symptom	GET
fe70c2f7-d76f-4227-8aea-0f2e66af7dd1	8237ca9b-4d03-424b-a409-e1a887362c22	USER	::1	\N	2024-12-04 00:23:07.611	/api/user-symptom-log	POST
c283e73c-34dd-49c0-a286-ef112e3e924e	8237ca9b-4d03-424b-a409-e1a887362c22	USER	::1	\N	2024-12-04 00:23:07.653	/api/user-symptom-log	GET
7660ac85-f3f3-47e9-b85a-6ed5a6a3e3a5	8237ca9b-4d03-424b-a409-e1a887362c22	USER	::1	\N	2024-12-04 00:23:07.668	/api/user-symptom-log	GET
f0e29451-0ee4-44e2-af64-eaf9b3c62c9a	735ae22b-b0b3-4433-8068-183d899f66d6	USER	::1	\N	2024-12-04 00:23:19.007	/api/symptom	GET
eecfb8df-7519-4459-b718-e41d8ea4e8e5	735ae22b-b0b3-4433-8068-183d899f66d6	USER	::1	\N	2024-12-04 00:23:48.767	/api/user-symptom-log	GET
a284f7ac-5b55-49d0-aa1e-bf4e37890ecc	373a4571-f30d-4a7e-b709-2dc2cdcdf5cb	USER	::1	\N	2024-12-04 00:23:59.806	/api/user-symptom-log	GET
cd48ce2f-6fbe-4472-bba4-0e3b8f7d61e7	373a4571-f30d-4a7e-b709-2dc2cdcdf5cb	USER	::1	\N	2024-12-04 00:24:00.621	/api/symptom	GET
853ffd6b-dd7c-42a4-9b14-df9d049818b1	373a4571-f30d-4a7e-b709-2dc2cdcdf5cb	USER	::1	\N	2024-12-04 00:25:21.247	/api/user-symptom-log	POST
c0f14a04-40ff-4532-a38c-5faf7368407f	373a4571-f30d-4a7e-b709-2dc2cdcdf5cb	USER	::1	\N	2024-12-04 00:25:21.304	/api/user-symptom-log	GET
9b395b15-5aef-4d6f-bc72-99ae5d33af2b	ffa4d2ab-640f-47f2-9d9a-e394c4fa48d9	USER	::1	\N	2024-12-04 00:25:40.416	/api/user-symptom-log	GET
0be110bd-c485-4712-b2b5-293111d0e21e	ffa4d2ab-640f-47f2-9d9a-e394c4fa48d9	USER	::1	\N	2024-12-04 00:26:17.362	/api/symptom	GET
013f0def-e7a1-4b69-b45c-5bfbfc375da1	8237ca9b-4d03-424b-a409-e1a887362c22	USER	::1	\N	2024-12-02 00:22:46.091	/api/symptom	GET
029f8236-b701-4409-be14-99d983236534	373a4571-f30d-4a7e-b709-2dc2cdcdf5cb	USER	::1	\N	2024-12-01 00:25:21.285	/api/user-symptom-log	GET
1dc8f160-bc44-466c-b371-ebbb852bbb62	928e323d-a9da-41e2-a69a-21d8410c5d0f	USER	::1	\N	2024-12-02 00:21:46.414	/api/user-symptom-log	GET
2767bb55-f136-42c7-9f2d-a8bfb0da726a	735ae22b-b0b3-4433-8068-183d899f66d6	USER	::1	\N	2024-12-02 00:23:18.203	/api/user-symptom-log	GET
4e4c2877-2ce8-4075-aed0-efbdf0ee8d4f	735ae22b-b0b3-4433-8068-183d899f66d6	USER	::1	\N	2024-11-30 00:23:48.689	/api/user-symptom-log	POST
508d976f-ede0-4474-beda-7f0dfe9d82f9	e5554595-88a5-4b10-a2b7-a043760b9e7f	USER	::1	\N	2024-12-01 00:22:06.329	/api/user-symptom-log	GET
535117fe-003b-40cc-8b87-06f1ca5fb1ae	735ae22b-b0b3-4433-8068-183d899f66d6	USER	::1	\N	2024-12-01 00:23:48.754	/api/user-symptom-log	GET
f5059bcf-2c2a-407f-abc5-a6a307802b97	e5554595-88a5-4b10-a2b7-a043760b9e7f	USER	::1	\N	2024-12-04 00:22:32.958	/api/user-symptom-log	POST
090ceb70-5112-4134-93cf-aa8dc2740219	e5554595-88a5-4b10-a2b7-a043760b9e7f	USER	::1	\N	2024-12-04 00:22:33.028	/api/user-symptom-log	GET
bdf14e76-4a7e-42d4-8ecc-12a8fd7b0ae8	e5554595-88a5-4b10-a2b7-a043760b9e7f	USER	::1	\N	2024-12-04 00:22:33.045	/api/user-symptom-log	GET
8066d8b9-2970-40d8-b3bd-a8ba8649b875	ffa4d2ab-640f-47f2-9d9a-e394c4fa48d9	USER	::1	\N	2024-12-04 00:25:41.152	/api/symptom	GET
a49e2935-c2b7-4052-99db-cbd794853ad2	ffa4d2ab-640f-47f2-9d9a-e394c4fa48d9	USER	::1	\N	2024-12-04 00:26:15.548	/api/user-symptom-log	POST
0f81db5d-c3ee-4dc9-bc87-2b5fe849294e	ffa4d2ab-640f-47f2-9d9a-e394c4fa48d9	USER	::1	\N	2024-12-04 00:26:16.391	/api/user-symptom-log	GET
189e3e09-f64e-424b-8134-49ccd6f563b7	ffa4d2ab-640f-47f2-9d9a-e394c4fa48d9	USER	::1	\N	2024-12-04 00:26:16.408	/api/user-symptom-log	GET
511a873f-c46a-4a5c-b108-ce34b82d79e4	8237ca9b-4d03-424b-a409-e1a887362c22	USER	::1	\N	2024-12-01 00:22:45.341	/api/user-symptom-log	GET
803da14a-ad8d-4f9e-bc6c-e62e90369e2d	a21d409f-8e4c-4119-83df-4d5f6be16598	ADMIN	::1	\N	2024-12-04 00:31:06.852	/api/symptom	GET
de0d0af4-7d73-46cf-a9ac-04988a7a5f6c	b61afd07-8c5d-4e41-a044-3175bfa973f4	PROVIDER	::1	\N	2024-12-04 00:32:00.365	/api/report/user-symptom-log	GET
48a2c93b-6d80-418b-bb95-6f8a82f6b0ec	b61afd07-8c5d-4e41-a044-3175bfa973f4	PROVIDER	::1	\N	2024-12-04 00:32:00.385	/api/report/user-symptom-log	GET
\.


--
-- Data for Name: Country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Country" (id, name, alpha2, active, "createdAt", "updatedAt") FROM stdin;
b44d8f0f-5ed9-4762-850e-0821b07b16fd	South Georgia	GS	t	2024-11-09 13:50:17.404	2024-11-09 13:50:17.404
c252a163-7fb8-43ac-aace-1d1bf023d8aa	Grenada	GD	t	2024-11-09 13:50:17.414	2024-11-09 13:50:17.414
410bdc20-c677-4017-88ee-aef0222ec426	Switzerland	CH	t	2024-11-09 13:50:17.415	2024-11-09 13:50:17.415
ef9a53c5-8e7f-430a-af5c-d890c994707f	Sierra Leone	SL	t	2024-11-09 13:50:17.417	2024-11-09 13:50:17.417
0fff431a-675c-45b3-a42b-34a49b7daf15	Hungary	HU	t	2024-11-09 13:50:17.419	2024-11-09 13:50:17.419
c54f8d4c-94de-4a9a-b5eb-6208fbf332c4	Taiwan	TW	t	2024-11-09 13:50:17.42	2024-11-09 13:50:17.42
f2af9c2c-1986-42ef-bbb6-d525c18e0e26	Wallis and Futuna	WF	t	2024-11-09 13:50:17.422	2024-11-09 13:50:17.422
0d2da323-3575-4bee-aca0-39968855b308	Barbados	BB	t	2024-11-09 13:50:17.423	2024-11-09 13:50:17.423
23d44bc6-0ce4-4499-a929-fd528ddb6963	Pitcairn Islands	PN	t	2024-11-09 13:50:17.425	2024-11-09 13:50:17.425
7499e845-44e8-48d9-b89c-0d7fcc0c357d	Ivory Coast	CI	t	2024-11-09 13:50:17.427	2024-11-09 13:50:17.427
c9e7cfde-1c9e-4490-93f8-6dbd8c80de37	Tunisia	TN	t	2024-11-09 13:50:17.428	2024-11-09 13:50:17.428
0e6eee20-78e8-4a88-8025-25f7ce651c99	Italy	IT	t	2024-11-09 13:50:17.429	2024-11-09 13:50:17.429
a9132b9e-f5d4-47cd-9b9b-9de60d928c2c	Benin	BJ	t	2024-11-09 13:50:17.43	2024-11-09 13:50:17.43
0545981c-11c6-4a1a-b70a-902578413b88	Indonesia	ID	t	2024-11-09 13:50:17.431	2024-11-09 13:50:17.431
2ed7ef92-0ef4-4270-b1a6-b41219c7017a	Cape Verde	CV	t	2024-11-09 13:50:17.433	2024-11-09 13:50:17.433
86f0fe17-be07-49f6-8e13-79e60fd40cdc	Saint Kitts and Nevis	KN	t	2024-11-09 13:50:17.434	2024-11-09 13:50:17.434
13416947-91cb-43b4-a0f9-1d8457d1a461	Laos	LA	t	2024-11-09 13:50:17.435	2024-11-09 13:50:17.435
04fee503-5d8c-40a5-9c52-7dbe89e3efc3	Caribbean Netherlands	BQ	t	2024-11-09 13:50:17.436	2024-11-09 13:50:17.436
26321b6a-5cc6-4828-8c3a-effd3cb7edee	Uganda	UG	t	2024-11-09 13:50:17.437	2024-11-09 13:50:17.437
dfa09fcd-8513-42a4-9c51-ffadf4e3350f	Andorra	AD	t	2024-11-09 13:50:17.438	2024-11-09 13:50:17.438
ca668883-8baa-4f10-92c4-860b1c919bb9	Burundi	BI	t	2024-11-09 13:50:17.439	2024-11-09 13:50:17.439
43e0356f-894f-4bc9-a8f6-15987a87c105	South Africa	ZA	t	2024-11-09 13:50:17.441	2024-11-09 13:50:17.441
2bf14b9c-21e7-42d9-b63a-2a3f856f9c0b	France	FR	t	2024-11-09 13:50:17.442	2024-11-09 13:50:17.442
61637fbf-73a9-4702-8d1d-3831c74a5116	Libya	LY	t	2024-11-09 13:50:17.443	2024-11-09 13:50:17.443
2478aea0-d8b0-4325-8bbf-13c9895fe06d	Mexico	MX	t	2024-11-09 13:50:17.444	2024-11-09 13:50:17.444
44411291-ea71-4169-a05e-334b308c0d1e	Gabon	GA	t	2024-11-09 13:50:17.445	2024-11-09 13:50:17.445
179f1d7c-0a26-457b-a894-228f7807e502	Northern Mariana Islands	MP	t	2024-11-09 13:50:17.446	2024-11-09 13:50:17.446
31a206bb-3ceb-4d2e-bf74-644e74e90b3e	North Macedonia	MK	t	2024-11-09 13:50:17.447	2024-11-09 13:50:17.447
885eae38-871b-4ceb-bbe3-8b327ce6e12f	China	CN	t	2024-11-09 13:50:17.448	2024-11-09 13:50:17.448
09c67607-0664-4614-a986-1d2371e2bae2	Yemen	YE	t	2024-11-09 13:50:17.449	2024-11-09 13:50:17.449
6bddd0fa-860e-43cb-b85f-85f9a999693e	Saint Barthélemy	BL	t	2024-11-09 13:50:17.45	2024-11-09 13:50:17.45
ff7445e8-fc49-4578-b604-9f3c3f3cc422	Guernsey	GG	t	2024-11-09 13:50:17.452	2024-11-09 13:50:17.452
ea3a1589-04bf-40bd-b09f-8f1fbfa0c27f	Solomon Islands	SB	t	2024-11-09 13:50:17.453	2024-11-09 13:50:17.453
842a5b57-88dd-48e9-9376-7fd2937519e6	Svalbard and Jan Mayen	SJ	t	2024-11-09 13:50:17.454	2024-11-09 13:50:17.454
00b009d8-e0bf-4afe-84a2-5784c2153d78	Faroe Islands	FO	t	2024-11-09 13:50:17.455	2024-11-09 13:50:17.455
7fe2b4b5-5354-42a7-be65-c069ea8278d3	Uzbekistan	UZ	t	2024-11-09 13:50:17.456	2024-11-09 13:50:17.456
bed2ab7f-249a-4c82-898d-c6380b9f659d	Egypt	EG	t	2024-11-09 13:50:17.458	2024-11-09 13:50:17.458
75d913cd-5c85-49a9-bea3-691d4cf61d09	Senegal	SN	t	2024-11-09 13:50:17.46	2024-11-09 13:50:17.46
b4d78b69-54b5-4365-b2c9-de88ed48eb14	Sri Lanka	LK	t	2024-11-09 13:50:17.461	2024-11-09 13:50:17.461
610b0105-a114-4ddf-89fe-941884507e48	Palestine	PS	t	2024-11-09 13:50:17.462	2024-11-09 13:50:17.462
997cf226-58ee-458e-be85-b70e9521773e	Bangladesh	BD	t	2024-11-09 13:50:17.463	2024-11-09 13:50:17.463
9c2253be-abd6-4913-80bc-78c0b5534f57	Peru	PE	t	2024-11-09 13:50:17.465	2024-11-09 13:50:17.465
14d97469-9506-4cec-a07a-50d67fb2c2eb	Singapore	SG	t	2024-11-09 13:50:17.466	2024-11-09 13:50:17.466
a936d83a-8a93-4e1d-b32e-93969bedd876	Turkey	TR	t	2024-11-09 13:50:17.467	2024-11-09 13:50:17.467
ac2171b1-b468-4a37-94f6-538919785474	Afghanistan	AF	t	2024-11-09 13:50:17.468	2024-11-09 13:50:17.468
325010ba-dab1-4391-ba8a-0a5f2de4fef4	Aruba	AW	t	2024-11-09 13:50:17.469	2024-11-09 13:50:17.469
70b10da7-cdf9-4367-b513-a9b791bfcad2	Cook Islands	CK	t	2024-11-09 13:50:17.47	2024-11-09 13:50:17.47
b0ce4614-9771-4705-92b6-e1200beff423	United Kingdom	GB	t	2024-11-09 13:50:17.471	2024-11-09 13:50:17.471
a73c4be4-82cc-42d2-8efc-caee3acb2e6e	Zambia	ZM	t	2024-11-09 13:50:17.474	2024-11-09 13:50:17.474
d3d57507-dff8-4245-865f-afedcba7a367	Finland	FI	t	2024-11-09 13:50:17.476	2024-11-09 13:50:17.476
d98524a1-90a4-4c29-a168-0ea344df7bcf	Niger	NE	t	2024-11-09 13:50:17.477	2024-11-09 13:50:17.477
8ac5956f-5810-42af-b7e4-e30df5c05d2f	Christmas Island	CX	t	2024-11-09 13:50:17.478	2024-11-09 13:50:17.478
bd0b34b0-c2da-45fd-ad1a-133414013c9e	Tokelau	TK	t	2024-11-09 13:50:17.48	2024-11-09 13:50:17.48
755e7926-a804-441a-9818-0229b95f394f	Guinea-Bissau	GW	t	2024-11-09 13:50:17.481	2024-11-09 13:50:17.481
c46f1156-ccc9-49b3-b532-9d3ecaba1499	Azerbaijan	AZ	t	2024-11-09 13:50:17.483	2024-11-09 13:50:17.483
4a14a556-7f3a-46cc-b3a6-7699aa229c4a	Réunion	RE	t	2024-11-09 13:50:17.484	2024-11-09 13:50:17.484
58391ea3-0c86-44f4-adc9-991933caa617	Djibouti	DJ	t	2024-11-09 13:50:17.486	2024-11-09 13:50:17.486
58379144-f24f-423a-8299-b562e805a2b1	North Korea	KP	t	2024-11-09 13:50:17.487	2024-11-09 13:50:17.487
a7a9a84c-d571-4ed9-94ee-ad31a3802969	Mauritius	MU	t	2024-11-09 13:50:17.488	2024-11-09 13:50:17.488
ff1c2dc7-343e-4ca4-834d-4c3d9b996d80	Montserrat	MS	t	2024-11-09 13:50:17.489	2024-11-09 13:50:17.489
42cfa6ad-c431-47a5-ae2d-ec8d64059abb	United States Virgin Islands	VI	t	2024-11-09 13:50:17.49	2024-11-09 13:50:17.49
fb4dc33a-7054-47eb-9b83-a44a9bc144d4	Colombia	CO	t	2024-11-09 13:50:17.492	2024-11-09 13:50:17.492
5a282a84-b52b-411f-9dd2-ccd04d118eb9	Greece	GR	t	2024-11-09 13:50:17.493	2024-11-09 13:50:17.493
8bd1465f-0305-4b80-8ee2-210846698ff0	Croatia	HR	t	2024-11-09 13:50:17.494	2024-11-09 13:50:17.494
a2761970-5d99-4d5a-aeec-62ad81b079f1	Morocco	MA	t	2024-11-09 13:50:17.495	2024-11-09 13:50:17.495
511fc9b5-e3d3-4693-8587-2f80b6975f53	Algeria	DZ	t	2024-11-09 13:50:17.496	2024-11-09 13:50:17.496
6ea9d5d1-f606-4856-b26f-fb78e0556bf2	Antarctica	AQ	t	2024-11-09 13:50:17.498	2024-11-09 13:50:17.498
5ec1f705-ec09-47bb-9172-d4a7fdd522b7	Netherlands	NL	t	2024-11-09 13:50:17.499	2024-11-09 13:50:17.499
5463edc4-7dfe-4102-870c-28a7c7c99576	Sudan	SD	t	2024-11-09 13:50:17.5	2024-11-09 13:50:17.5
07bcf9a8-089c-4518-973b-0bbdcc26c66a	Fiji	FJ	t	2024-11-09 13:50:17.501	2024-11-09 13:50:17.501
e742f374-69b9-41d3-b3dc-bae1376e8f92	Liechtenstein	LI	t	2024-11-09 13:50:17.503	2024-11-09 13:50:17.503
78951aae-910f-4b62-9c83-43d1f8c865fd	Nepal	NP	t	2024-11-09 13:50:17.504	2024-11-09 13:50:17.504
12e10a5a-9816-4ea8-9095-25d8361bbfe9	Puerto Rico	PR	t	2024-11-09 13:50:17.506	2024-11-09 13:50:17.506
a204eb44-6b7b-4a07-947a-442ce4305c46	Georgia	GE	t	2024-11-09 13:50:17.507	2024-11-09 13:50:17.507
26a9af2d-6274-4315-badc-924dcc635c8b	Pakistan	PK	t	2024-11-09 13:50:17.508	2024-11-09 13:50:17.508
9a6e8963-e838-49f0-a3d1-0c576ff5195d	Monaco	MC	t	2024-11-09 13:50:17.51	2024-11-09 13:50:17.51
2ae8e1f8-b8c7-435f-bf78-d75059b22254	Botswana	BW	t	2024-11-09 13:50:17.512	2024-11-09 13:50:17.512
277a41e8-14da-487d-8afd-9cd3896275cd	Lebanon	LB	t	2024-11-09 13:50:17.513	2024-11-09 13:50:17.513
c08a1f54-9227-4520-9f71-18b50a244562	Papua New Guinea	PG	t	2024-11-09 13:50:17.514	2024-11-09 13:50:17.514
ec449d19-5280-4811-b0ff-ba09d5f25de5	Mayotte	YT	t	2024-11-09 13:50:17.516	2024-11-09 13:50:17.516
a5ffb26f-fc5d-43f3-bbe8-40a7d5809be0	Dominican Republic	DO	t	2024-11-09 13:50:17.517	2024-11-09 13:50:17.517
c345577d-5cf4-4cab-8f4a-e0502bb966fe	Norfolk Island	NF	t	2024-11-09 13:50:17.518	2024-11-09 13:50:17.518
471e722d-b676-4df3-b8bd-bb9353cd2e5e	Bouvet Island	BV	t	2024-11-09 13:50:17.519	2024-11-09 13:50:17.519
cda0e1ff-5181-410a-b108-22d314dad04f	Qatar	QA	t	2024-11-09 13:50:17.52	2024-11-09 13:50:17.52
98fdb132-be74-482b-902d-8a095c1e0afd	Madagascar	MG	t	2024-11-09 13:50:17.521	2024-11-09 13:50:17.521
c2e88cd6-050c-4340-bd3e-a8e0536556b6	India	IN	t	2024-11-09 13:50:17.522	2024-11-09 13:50:17.522
6ab29fa0-9294-488f-b255-da38bdc6befe	Syria	SY	t	2024-11-09 13:50:17.523	2024-11-09 13:50:17.523
872bbc32-a0b3-4957-9313-84807f20e905	Montenegro	ME	t	2024-11-09 13:50:17.524	2024-11-09 13:50:17.524
71c8ee48-5ad7-4553-bc96-f9d59ccbdb05	Eswatini	SZ	t	2024-11-09 13:50:17.525	2024-11-09 13:50:17.525
f15d61b8-33e5-408a-81e6-0aadc6340146	Paraguay	PY	t	2024-11-09 13:50:17.526	2024-11-09 13:50:17.526
5a3e9b7a-2fc2-4c8e-8846-410d5eeab71f	El Salvador	SV	t	2024-11-09 13:50:17.527	2024-11-09 13:50:17.527
ef6855be-2dfc-43f3-9074-687277be93e7	Ukraine	UA	t	2024-11-09 13:50:17.528	2024-11-09 13:50:17.528
5c91e021-949f-4cec-9acd-c6fd1bd3b0b0	Isle of Man	IM	t	2024-11-09 13:50:17.529	2024-11-09 13:50:17.529
a84f2a01-1818-4673-9938-08710f8ec2f7	Namibia	NA	t	2024-11-09 13:50:17.53	2024-11-09 13:50:17.53
c55b6af2-14a9-4b00-a42f-b8ddc9975d50	United Arab Emirates	AE	t	2024-11-09 13:50:17.531	2024-11-09 13:50:17.531
8cfe6950-7cf3-4c0d-87db-30959e62386a	Bulgaria	BG	t	2024-11-09 13:50:17.532	2024-11-09 13:50:17.532
ec80a92f-4639-442a-95bd-eda74aac321f	Greenland	GL	t	2024-11-09 13:50:17.533	2024-11-09 13:50:17.533
fc33b6d0-9f39-447b-a1c9-257805e40d82	Germany	DE	t	2024-11-09 13:50:17.534	2024-11-09 13:50:17.534
08b72b4b-bc7e-4040-bb2e-a952237901cf	Cambodia	KH	t	2024-11-09 13:50:17.535	2024-11-09 13:50:17.535
4a72906a-b8e7-457b-bbbc-f6188af901d2	Iraq	IQ	t	2024-11-09 13:50:17.536	2024-11-09 13:50:17.536
ca225f00-9046-4a4a-9337-58a731abaae9	French Southern and Antarctic Lands	TF	t	2024-11-09 13:50:17.537	2024-11-09 13:50:17.537
2f92c1d6-66a2-4e38-9198-725d807a89f4	Sweden	SE	t	2024-11-09 13:50:17.538	2024-11-09 13:50:17.538
c5ac4531-1cbd-4a89-a52f-9f6aaad23a43	Cuba	CU	t	2024-11-09 13:50:17.539	2024-11-09 13:50:17.539
139fd888-d957-4729-ba30-5331880a0693	Kyrgyzstan	KG	t	2024-11-09 13:50:17.54	2024-11-09 13:50:17.54
5cb7f15b-db7c-473e-afcc-d600beedb87e	Russia	RU	t	2024-11-09 13:50:17.541	2024-11-09 13:50:17.541
543268a8-b22f-4e84-a91a-b98cb77c5117	Malaysia	MY	t	2024-11-09 13:50:17.542	2024-11-09 13:50:17.542
12ec08f2-0c0c-4763-9c31-573c08332a7e	São Tomé and Príncipe	ST	t	2024-11-09 13:50:17.543	2024-11-09 13:50:17.543
2bfb8bb6-27fa-44bb-9019-acea6be54d02	Cyprus	CY	t	2024-11-09 13:50:17.544	2024-11-09 13:50:17.544
3a6be9bd-6450-4d76-b05f-78e9e1135c14	Canada	CA	t	2024-11-09 13:50:17.545	2024-11-09 13:50:17.545
5af9a169-5020-4bcc-aaa3-c29ad3c487b0	Malawi	MW	t	2024-11-09 13:50:17.545	2024-11-09 13:50:17.545
26adc438-5f4c-415c-8bec-263b4ce2cf8a	Saudi Arabia	SA	t	2024-11-09 13:50:17.546	2024-11-09 13:50:17.546
c3bc4e4c-2c6d-40f9-a4b5-bb3c4fed854e	Bosnia and Herzegovina	BA	t	2024-11-09 13:50:17.547	2024-11-09 13:50:17.547
4a7aea12-285d-4a14-9ebf-019bb68fb164	Ethiopia	ET	t	2024-11-09 13:50:17.548	2024-11-09 13:50:17.548
44a379d9-175a-4f00-879a-4379db06646f	Spain	ES	t	2024-11-09 13:50:17.548	2024-11-09 13:50:17.548
c6976204-bcc7-484a-949e-526bfd524e5e	Slovenia	SI	t	2024-11-09 13:50:17.549	2024-11-09 13:50:17.549
1044512a-3ac8-48ec-b730-2a47659657d5	Oman	OM	t	2024-11-09 13:50:17.55	2024-11-09 13:50:17.55
224e23ae-6613-46bc-a044-7b90191dbd85	Saint Pierre and Miquelon	PM	t	2024-11-09 13:50:17.551	2024-11-09 13:50:17.551
27473135-3a2a-4592-90ee-f4bbadb8dc14	Macau	MO	t	2024-11-09 13:50:17.551	2024-11-09 13:50:17.551
9fa62b9f-fb45-4c2c-85c2-a75740dd3d5e	San Marino	SM	t	2024-11-09 13:50:17.552	2024-11-09 13:50:17.552
bb2ebd90-5c42-4cae-8dbb-fdf374b85eee	Lesotho	LS	t	2024-11-09 13:50:17.553	2024-11-09 13:50:17.553
508832b1-6f78-459a-8ed9-64c4e9a43ceb	Marshall Islands	MH	t	2024-11-09 13:50:17.554	2024-11-09 13:50:17.554
464a3099-814d-40b0-998f-bb3dfe180df3	Sint Maarten	SX	t	2024-11-09 13:50:17.555	2024-11-09 13:50:17.555
f8d834cb-c2ee-4915-99a6-4c5fd6f29c1c	Iceland	IS	t	2024-11-09 13:50:17.555	2024-11-09 13:50:17.555
ed6a7c25-6a42-4a8c-8d6b-720a4ba5d1a6	Luxembourg	LU	t	2024-11-09 13:50:17.556	2024-11-09 13:50:17.556
afc841f0-da06-43e7-8aa0-9868dd53b2c1	Argentina	AR	t	2024-11-09 13:50:17.557	2024-11-09 13:50:17.557
cf5ba4e0-b504-476b-9548-affa67913cac	Turks and Caicos Islands	TC	t	2024-11-09 13:50:17.557	2024-11-09 13:50:17.557
dfd91f4d-b7ae-4fee-9d92-d0670c1ea0de	Nauru	NR	t	2024-11-09 13:50:17.558	2024-11-09 13:50:17.558
e9490455-3938-440a-8a2c-7725710cb28a	Cocos (Keeling) Islands	CC	t	2024-11-09 13:50:17.56	2024-11-09 13:50:17.56
8be6fdfb-b58e-44b3-994b-6fd9d4d5a8ef	Western Sahara	EH	t	2024-11-09 13:50:17.561	2024-11-09 13:50:17.561
e8cb41fc-cf3c-4582-95bd-d17827d13b5f	Dominica	DM	t	2024-11-09 13:50:17.562	2024-11-09 13:50:17.562
227f1255-2195-4fe9-8c22-5eca82e725e0	Costa Rica	CR	t	2024-11-09 13:50:17.563	2024-11-09 13:50:17.563
009f5771-bffd-48ca-98b5-4adcb951f470	Australia	AU	t	2024-11-09 13:50:17.564	2024-11-09 13:50:17.564
8ee0c7bf-7264-4521-ae7a-68232f6b60d7	Thailand	TH	t	2024-11-09 13:50:17.565	2024-11-09 13:50:17.565
3b46a25f-068e-4035-b4e3-4c06c50fa288	Haiti	HT	t	2024-11-09 13:50:17.566	2024-11-09 13:50:17.566
d2f02342-0e4c-4452-80b8-b857244618d0	Tuvalu	TV	t	2024-11-09 13:50:17.567	2024-11-09 13:50:17.567
2bfec299-27c5-4a40-986d-e8ab6b9210a4	Honduras	HN	t	2024-11-09 13:50:17.568	2024-11-09 13:50:17.568
38542cd9-d241-42b0-b018-fecc5fe09485	Equatorial Guinea	GQ	t	2024-11-09 13:50:17.569	2024-11-09 13:50:17.569
2846a30c-a8b1-430c-a9b0-d4c0a40a415c	Saint Lucia	LC	t	2024-11-09 13:50:17.57	2024-11-09 13:50:17.57
d8b15f07-cd0b-4198-99e5-2225099850e4	French Polynesia	PF	t	2024-11-09 13:50:17.571	2024-11-09 13:50:17.571
105481bc-a57e-4840-a966-09e741ae5380	Belarus	BY	t	2024-11-09 13:50:17.571	2024-11-09 13:50:17.571
349792f6-91c4-4f52-9446-774dee5e514d	Latvia	LV	t	2024-11-09 13:50:17.572	2024-11-09 13:50:17.572
e5576d76-c577-44bd-8fa3-4e3fa091b5da	Palau	PW	t	2024-11-09 13:50:17.573	2024-11-09 13:50:17.573
a33d5e57-de74-4a98-aef3-b05fdaf15ced	Guadeloupe	GP	t	2024-11-09 13:50:17.574	2024-11-09 13:50:17.574
33846a2b-173d-4787-8f30-776450078eab	Philippines	PH	t	2024-11-09 13:50:17.575	2024-11-09 13:50:17.575
a1279e98-0fc8-475a-bcee-33f16a17da22	Gibraltar	GI	t	2024-11-09 13:50:17.576	2024-11-09 13:50:17.576
5f8763a3-7697-4762-ba72-2da2ca1d09b1	Denmark	DK	t	2024-11-09 13:50:17.577	2024-11-09 13:50:17.577
a4e8ccc6-1570-4994-8a21-61d4f85a45f2	Cameroon	CM	t	2024-11-09 13:50:17.577	2024-11-09 13:50:17.577
6344dddd-22c2-43d2-95be-1af4e576a4f3	Guinea	GN	t	2024-11-09 13:50:17.578	2024-11-09 13:50:17.578
499ec1cc-1b75-4c58-9671-98685fd33144	Bahrain	BH	t	2024-11-09 13:50:17.579	2024-11-09 13:50:17.579
84edf824-f641-459c-a846-2830d25e265a	Suriname	SR	t	2024-11-09 13:50:17.58	2024-11-09 13:50:17.58
ff3de885-ca7d-4b03-9f07-ae6841705f21	DR Congo	CD	t	2024-11-09 13:50:17.581	2024-11-09 13:50:17.581
1326d10f-0d68-4d6f-93fa-e9bcbe30821d	Somalia	SO	t	2024-11-09 13:50:17.582	2024-11-09 13:50:17.582
224f0b0e-f7e8-4f1f-be76-31e5b2bae6a5	Czechia	CZ	t	2024-11-09 13:50:17.583	2024-11-09 13:50:17.583
00b91fc6-eb23-46ac-a084-f7c04f035404	New Caledonia	NC	t	2024-11-09 13:50:17.584	2024-11-09 13:50:17.584
9aaedaa3-809a-4973-a305-c257b95a2b14	Vanuatu	VU	t	2024-11-09 13:50:17.585	2024-11-09 13:50:17.585
2d0a454f-3e10-4115-a484-8c5d5e3fe112	Saint Helena, Ascension and Tristan da Cunha	SH	t	2024-11-09 13:50:17.585	2024-11-09 13:50:17.585
75f463d4-1080-4df3-a74b-1da618894c0f	Togo	TG	t	2024-11-09 13:50:17.586	2024-11-09 13:50:17.586
1dce2b72-b75d-41da-8a46-869249670791	British Virgin Islands	VG	t	2024-11-09 13:50:17.587	2024-11-09 13:50:17.587
864e5327-718f-40c3-aa8a-3d057040bd78	Kenya	KE	t	2024-11-09 13:50:17.588	2024-11-09 13:50:17.588
6f7cb9d5-f64c-4433-9238-0e432e4886b4	Niue	NU	t	2024-11-09 13:50:17.589	2024-11-09 13:50:17.589
c703d218-3de0-434d-a8b4-d3355cb4c46f	Heard Island and McDonald Islands	HM	t	2024-11-09 13:50:17.59	2024-11-09 13:50:17.59
1143b21f-d319-4d31-843c-b5fccb2fd499	Rwanda	RW	t	2024-11-09 13:50:17.591	2024-11-09 13:50:17.591
c161fe6e-68fe-4399-b929-87df8266baf8	Estonia	EE	t	2024-11-09 13:50:17.592	2024-11-09 13:50:17.592
2faa3941-1dcc-4bb3-be68-f6a42a428ec1	Romania	RO	t	2024-11-09 13:50:17.593	2024-11-09 13:50:17.593
8ed030c6-8406-4a57-abf4-b836a464b3f6	Trinidad and Tobago	TT	t	2024-11-09 13:50:17.594	2024-11-09 13:50:17.594
9fe633dc-2b76-4adb-a171-adaf0572666c	Guyana	GY	t	2024-11-09 13:50:17.595	2024-11-09 13:50:17.595
5bf8ff76-6d59-43c1-9529-2dba0e2633be	Timor-Leste	TL	t	2024-11-09 13:50:17.596	2024-11-09 13:50:17.596
2a1dc0b2-3315-49e8-8a09-23a3e43fdcdc	Vietnam	VN	t	2024-11-09 13:50:17.597	2024-11-09 13:50:17.597
d4d7855b-3590-41fa-9361-c89a754ede99	Uruguay	UY	t	2024-11-09 13:50:17.598	2024-11-09 13:50:17.598
452bcbc6-057b-46c6-a417-a2965ff62c02	Vatican City	VA	t	2024-11-09 13:50:17.599	2024-11-09 13:50:17.599
54592cca-8866-44f9-8430-4fcca39913c7	Hong Kong	HK	t	2024-11-09 13:50:17.6	2024-11-09 13:50:17.6
939ba924-6914-444a-8411-47937a2e9814	Austria	AT	t	2024-11-09 13:50:17.601	2024-11-09 13:50:17.601
2b11591a-0d45-4e1e-97cd-5f267278736e	Antigua and Barbuda	AG	t	2024-11-09 13:50:17.602	2024-11-09 13:50:17.602
cbc504c4-b105-44bd-8519-ddd344ac9f87	Turkmenistan	TM	t	2024-11-09 13:50:17.604	2024-11-09 13:50:17.604
70182c1c-e64e-4251-a5f5-2c0a36d1eab5	Mozambique	MZ	t	2024-11-09 13:50:17.605	2024-11-09 13:50:17.605
709b60a5-6762-4eec-9e6c-15522692f1a2	Panama	PA	t	2024-11-09 13:50:17.606	2024-11-09 13:50:17.606
946b7210-eccd-41d2-a600-92db69698b8e	Micronesia	FM	t	2024-11-09 13:50:17.607	2024-11-09 13:50:17.607
a2c732a3-1d33-42b8-94f9-c9f56f0339bb	Ireland	IE	t	2024-11-09 13:50:17.608	2024-11-09 13:50:17.608
9a60fbc9-2f9f-4e69-9625-20358c427143	Curaçao	CW	t	2024-11-09 13:50:17.609	2024-11-09 13:50:17.609
2f203c45-79b5-4039-a10f-e07afd0a8060	French Guiana	GF	t	2024-11-09 13:50:17.609	2024-11-09 13:50:17.609
298b0be4-ee87-4e20-b8b2-77b409aa64b4	Norway	NO	t	2024-11-09 13:50:17.61	2024-11-09 13:50:17.61
0d0a78d8-9bbd-4ceb-9b26-e78129dbd142	Åland Islands	AX	t	2024-11-09 13:50:17.611	2024-11-09 13:50:17.611
e2c6a0a8-f4b8-401c-82cb-ac95c43a0cc2	Central African Republic	CF	t	2024-11-09 13:50:17.612	2024-11-09 13:50:17.612
e833ecfb-71a7-4673-a0cf-2322106e25b2	Burkina Faso	BF	t	2024-11-09 13:50:17.613	2024-11-09 13:50:17.613
85a1510d-dcd0-4dbc-925c-ba7a81363d2f	Eritrea	ER	t	2024-11-09 13:50:17.615	2024-11-09 13:50:17.615
91c712de-5889-4ac4-9312-55cf2694de0c	Tanzania	TZ	t	2024-11-09 13:50:17.615	2024-11-09 13:50:17.615
98d8f5fa-f079-44d9-8143-e7329301b08b	South Korea	KR	t	2024-11-09 13:50:17.616	2024-11-09 13:50:17.616
401804b8-f607-40db-ace6-d3c353c55e47	Jordan	JO	t	2024-11-09 13:50:17.617	2024-11-09 13:50:17.617
fa69f16b-fb6e-42ba-8fd9-e12ea324f9ad	Mauritania	MR	t	2024-11-09 13:50:17.618	2024-11-09 13:50:17.618
1fe97001-2fd8-48f6-b869-f1c60924e648	Lithuania	LT	t	2024-11-09 13:50:17.619	2024-11-09 13:50:17.619
7336da6d-34a6-4f56-a2c7-fdc90609e9eb	United States Minor Outlying Islands	UM	t	2024-11-09 13:50:17.62	2024-11-09 13:50:17.62
f6641a13-76c4-4a0c-99da-94505f31f3de	Slovakia	SK	t	2024-11-09 13:50:17.62	2024-11-09 13:50:17.62
f60fe5b1-b420-4c1f-804d-a23dc5ec26d7	Angola	AO	t	2024-11-09 13:50:17.621	2024-11-09 13:50:17.621
eea5b9e7-2299-47ba-8463-9cbf4ec1f908	Kazakhstan	KZ	t	2024-11-09 13:50:17.622	2024-11-09 13:50:17.622
7a6aaa0b-bf7f-4420-9908-89bd1237a497	Moldova	MD	t	2024-11-09 13:50:17.623	2024-11-09 13:50:17.623
e1da221b-56a9-430b-894a-fe2545c746c0	Mali	ML	t	2024-11-09 13:50:17.624	2024-11-09 13:50:17.624
f9f73ef0-5ab6-4d36-b972-44bdda74a37b	Falkland Islands	FK	t	2024-11-09 13:50:17.625	2024-11-09 13:50:17.625
b4535eb6-a670-4f31-80f7-f22218a909a2	Armenia	AM	t	2024-11-09 13:50:17.625	2024-11-09 13:50:17.625
89bae636-706c-49de-b22f-2b156d72e0cd	Samoa	WS	t	2024-11-09 13:50:17.626	2024-11-09 13:50:17.626
997199f0-489a-4d57-a15d-68762a87d557	Jersey	JE	t	2024-11-09 13:50:17.627	2024-11-09 13:50:17.627
e3c43361-08d5-4d6a-aa98-9f83fbd24c84	Japan	JP	t	2024-11-09 13:50:17.628	2024-11-09 13:50:17.628
b357e4d5-adee-44ea-86cb-6a3853dfb497	Bolivia	BO	t	2024-11-09 13:50:17.629	2024-11-09 13:50:17.629
f6e69b8e-fad8-45e3-90d3-b7fc926a1fee	Chile	CL	t	2024-11-09 13:50:17.63	2024-11-09 13:50:17.63
afce3b11-a317-4b7c-9b18-f45a420015b1	United States	US	t	2024-11-09 13:50:17.631	2024-11-09 13:50:17.631
863e1495-88b3-4f46-9cc6-29209b92fc52	Saint Vincent and the Grenadines	VC	t	2024-11-09 13:50:17.632	2024-11-09 13:50:17.632
33b9e0b3-c174-4e18-b4f4-4d44634e55f5	Bermuda	BM	t	2024-11-09 13:50:17.633	2024-11-09 13:50:17.633
1426918d-c735-4078-9454-3af732633f6e	Seychelles	SC	t	2024-11-09 13:50:17.634	2024-11-09 13:50:17.634
ef6e7f05-3cd7-47da-80c8-5ab2fa9599c5	British Indian Ocean Territory	IO	t	2024-11-09 13:50:17.635	2024-11-09 13:50:17.635
ca24d3ef-703c-4433-94f4-9d9114da5ce0	Guatemala	GT	t	2024-11-09 13:50:17.636	2024-11-09 13:50:17.636
8484eca2-d6e4-4e1d-b427-b457e571ff3a	Ecuador	EC	t	2024-11-09 13:50:17.637	2024-11-09 13:50:17.637
20bd36d3-77c4-49c2-867a-3e1379c914df	Martinique	MQ	t	2024-11-09 13:50:17.638	2024-11-09 13:50:17.638
6af39388-9476-47fb-ad84-de2438cac5da	Tajikistan	TJ	t	2024-11-09 13:50:17.639	2024-11-09 13:50:17.639
6345ca1d-c7a1-42ff-9695-d59056409544	Malta	MT	t	2024-11-09 13:50:17.639	2024-11-09 13:50:17.639
b5c101e6-4418-4a16-bd18-d79efb4bf4f5	Gambia	GM	t	2024-11-09 13:50:17.64	2024-11-09 13:50:17.64
d0eb57b7-fb22-40a4-99aa-49c1c2691b9a	Nigeria	NG	t	2024-11-09 13:50:17.641	2024-11-09 13:50:17.641
ea1f38a8-e7f0-4fd9-ba7e-1325d9cba904	Bahamas	BS	t	2024-11-09 13:50:17.642	2024-11-09 13:50:17.642
b8add417-8198-4fcf-abbb-b67a0d543b61	Kosovo	XK	t	2024-11-09 13:50:17.642	2024-11-09 13:50:17.642
6a3a3714-d90b-4f37-b8f5-f8596131fe0a	Kuwait	KW	t	2024-11-09 13:50:17.643	2024-11-09 13:50:17.643
e2e26538-928e-4d59-ae64-51bfef463f8b	Maldives	MV	t	2024-11-09 13:50:17.644	2024-11-09 13:50:17.644
8b789c5a-8b0c-4979-b1eb-8cfd6356df9b	South Sudan	SS	t	2024-11-09 13:50:17.645	2024-11-09 13:50:17.645
f99400b6-5bdd-4aad-8d1d-86d9280f0eca	Iran	IR	t	2024-11-09 13:50:17.645	2024-11-09 13:50:17.645
f44db86e-b452-4497-aa5c-257517d14e1d	Albania	AL	t	2024-11-09 13:50:17.646	2024-11-09 13:50:17.646
c7bdb9b0-e9b2-4b0d-a36a-229f5d03b65a	Brazil	BR	t	2024-11-09 13:50:17.647	2024-11-09 13:50:17.647
cd05f4f1-4efd-4bb6-8d78-741b1346fada	Serbia	RS	t	2024-11-09 13:50:17.647	2024-11-09 13:50:17.647
0c0a5937-c008-47c9-b404-b672906d54c0	Belize	BZ	t	2024-11-09 13:50:17.648	2024-11-09 13:50:17.648
6e254e19-2ea2-49cd-9160-c379dc222df9	Myanmar	MM	t	2024-11-09 13:50:17.649	2024-11-09 13:50:17.649
f768a6cf-5e8b-40c8-93ac-44bcc2eb00ed	Bhutan	BT	t	2024-11-09 13:50:17.649	2024-11-09 13:50:17.649
dfa14e00-2210-44c8-a137-88735e35f87d	Venezuela	VE	t	2024-11-09 13:50:17.65	2024-11-09 13:50:17.65
50ddb3be-92cb-486f-bbef-d33cc482d007	Liberia	LR	t	2024-11-09 13:50:17.651	2024-11-09 13:50:17.651
f6095b92-d2e5-4df5-a94b-a653fb95753e	Jamaica	JM	t	2024-11-09 13:50:17.651	2024-11-09 13:50:17.651
bbc498e7-c6d0-4385-b848-ed63e0078e37	Poland	PL	t	2024-11-09 13:50:17.652	2024-11-09 13:50:17.652
76504eff-a9a5-4813-8389-99790a5d5ad5	Cayman Islands	KY	t	2024-11-09 13:50:17.653	2024-11-09 13:50:17.653
86336946-1e91-46a6-8045-1750093046f3	Brunei	BN	t	2024-11-09 13:50:17.654	2024-11-09 13:50:17.654
8c66a20f-da97-4874-81a0-125d56aec7dd	Comoros	KM	t	2024-11-09 13:50:17.654	2024-11-09 13:50:17.654
288b2233-49a5-44a3-8761-37296ea0595d	Guam	GU	t	2024-11-09 13:50:17.655	2024-11-09 13:50:17.655
6deb6cc7-419b-4223-a9d1-5e110fc8f2bd	Tonga	TO	t	2024-11-09 13:50:17.656	2024-11-09 13:50:17.656
a8d8c853-fb5e-45bd-93e1-181cde930144	Kiribati	KI	t	2024-11-09 13:50:17.657	2024-11-09 13:50:17.657
21cfd881-dc83-480f-8a8b-e65b4b0ba606	Ghana	GH	t	2024-11-09 13:50:17.657	2024-11-09 13:50:17.657
3382a939-69be-4c70-9eb1-20f170648430	Chad	TD	t	2024-11-09 13:50:17.658	2024-11-09 13:50:17.658
22a4f402-3000-4717-8070-d1f90ac607c7	Zimbabwe	ZW	t	2024-11-09 13:50:17.66	2024-11-09 13:50:17.66
866009c0-734d-4495-9999-080677a8a792	Saint Martin	MF	t	2024-11-09 13:50:17.661	2024-11-09 13:50:17.661
184ba1bc-8c74-48e4-a585-d5514b1d05cc	Mongolia	MN	t	2024-11-09 13:50:17.662	2024-11-09 13:50:17.662
642d1c47-47e6-4bb6-8b74-8c50d7bde216	Portugal	PT	t	2024-11-09 13:50:17.663	2024-11-09 13:50:17.663
c52d80b1-d59f-4d9b-8da3-a57c647bce85	American Samoa	AS	t	2024-11-09 13:50:17.664	2024-11-09 13:50:17.664
fd235f93-77ce-40d1-936e-0e65f38b61c6	Republic of the Congo	CG	t	2024-11-09 13:50:17.665	2024-11-09 13:50:17.665
94a9f6cc-753e-4b4e-883b-802708860e7c	Belgium	BE	t	2024-11-09 13:50:17.666	2024-11-09 13:50:17.666
a9f7963b-298a-44fe-8c43-883e68d379d2	Israel	IL	t	2024-11-09 13:50:17.668	2024-11-09 13:50:17.668
dcd1000e-4982-43a0-94ca-1f0bf431c37c	New Zealand	NZ	t	2024-11-09 13:50:17.669	2024-11-09 13:50:17.669
be4e980d-d8e9-47e9-97be-5ca159d148d0	Nicaragua	NI	t	2024-11-09 13:50:17.671	2024-11-09 13:50:17.671
9e0dff99-8557-4260-a36f-0581f3ea5c82	Anguilla	AI	t	2024-11-09 13:50:17.671	2024-11-09 13:50:17.671
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" (id, city, state, latitude, longitude, "createdAt", "updatedAt", "countryId") FROM stdin;
9c33781f-84ab-4672-91e7-c672432c5f41	Traverse City	Michigan	44.7606441	-85.6165301	2024-11-09 17:16:23.042	2024-11-09 17:16:23.042	afce3b11-a317-4b7c-9b18-f45a420015b1
c5d86859-7cc0-4bd7-bec0-8fc0b53e1141	Oslo	\N	59.9133301	10.7389701	2024-11-09 17:17:35.514	2024-11-09 17:17:35.514	298b0be4-ee87-4e20-b8b2-77b409aa64b4
080b1811-4509-4941-a49e-c1e5b4566897	Kristiansand	\N	58.0856276	7.93185802875815	2024-11-09 22:49:26.988	2024-11-09 22:49:26.988	298b0be4-ee87-4e20-b8b2-77b409aa64b4
f93af2ea-7732-4808-81c8-896eda65b440	Bergen	\N	60.3943055	5.3259192	2024-11-09 23:12:40.625	2024-11-09 23:12:40.625	298b0be4-ee87-4e20-b8b2-77b409aa64b4
bd0ed51f-5a21-4e54-896b-713e6b17303c	Los Angeles	California	34.0536909	-118.242766	2024-11-10 00:04:03.178	2024-11-10 00:04:03.178	afce3b11-a317-4b7c-9b18-f45a420015b1
742c9ae9-6d24-4bc0-bbbd-2cfa62a0ba6a	Chicago	Illinois	41.8755616	-87.6244212	2024-11-24 21:16:21.766	2024-11-24 21:16:21.766	afce3b11-a317-4b7c-9b18-f45a420015b1
d8516e6d-1213-428f-910f-61a762379c44	London	England	51.5073219	-0.1276474	2024-11-26 00:26:05.216	2024-11-26 00:26:05.216	b0ce4614-9771-4705-92b6-e1200beff423
6fac01be-ff72-4252-a6f3-8deb8410d5f4	Aarhus	Central Denmark Region	56.1496278	10.2134046	2024-12-01 17:21:32.505	2024-12-01 17:21:32.505	5f8763a3-7697-4762-ba72-2da2ca1d09b1
93810922-7818-43d6-9cc8-a53090e5ec68	Copenhagen	Capital Region of Denmark	55.6867243	12.5700724	2024-12-03 00:28:02.931	2024-12-03 00:28:02.931	5f8763a3-7697-4762-ba72-2da2ca1d09b1
aa9c6148-6035-41f1-9996-fe06e806d822	Detroit	Michigan	42.3315509	-83.0466403	2024-12-03 12:23:36.748	2024-12-03 12:23:36.748	afce3b11-a317-4b7c-9b18-f45a420015b1
95188235-a0b0-436e-9a68-dcb44c96e65f	Moscow	Moscow	55.7504461	37.6174943	2024-12-04 00:17:03.919	2024-12-04 00:17:03.919	5cb7f15b-db7c-473e-afcc-d600beedb87e
61c62bea-88f5-43b7-9711-841e287a1b5a	New York	New York	40.7127281	-74.0060152	2024-12-04 00:19:03.233	2024-12-04 00:19:03.233	afce3b11-a317-4b7c-9b18-f45a420015b1
f800a7df-5990-4fda-9751-93bb220148d5	Dublin	\N	53.3498006	-6.2602964	2024-12-04 00:21:46.326	2024-12-04 00:21:46.326	a2c732a3-1d33-42b8-94f9-c9f56f0339bb
46eaa6b8-bcad-4674-8e55-ff308ff29808	Berlin	\N	52.5170365	13.3888599	2024-12-04 00:26:16.35	2024-12-04 00:26:16.35	fc33b6d0-9f39-447b-a1c9-257805e40d82
\.


--
-- Data for Name: ProviderProfile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProviderProfile" (id, "providerId", specialty, "locationId", title, "createdAt", "updatedAt", "firstName", "lastName") FROM stdin;
\.


--
-- Data for Name: Symptom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Symptom" (id, name, description, "createdAt", "updatedAt") FROM stdin;
440d2dbc-cced-479a-af8e-7f9f396470eb	Fever	An elevated body temperature, often indicative of an infection.	2024-12-04 00:14:33.825	2024-12-04 00:14:33.825
037483ea-0f5d-4f30-8a3e-024b38807c87	Cough	A reflex action to clear your airways of mucus and irritants.	2024-12-04 00:14:33.844	2024-12-04 00:14:33.844
0803305a-5198-450b-b023-3a03ba18ef84	Shortness of Breath	Difficulty breathing or feeling like you cannot get enough air.	2024-12-04 00:14:33.845	2024-12-04 00:14:33.845
c71d1347-8acf-47a9-90eb-b7893c96008e	Fatigue	A feeling of extreme tiredness or lack of energy.	2024-12-04 00:14:33.846	2024-12-04 00:14:33.846
455434a8-a349-48f7-a662-4030f56a827e	Headache	Pain in the head or upper neck.	2024-12-04 00:14:33.847	2024-12-04 00:14:33.847
0ec99fc8-4990-49a1-b8c2-aada4217c92b	Sore Throat	Pain or irritation in the throat that can worsen when swallowing.	2024-12-04 00:14:33.848	2024-12-04 00:14:33.848
cef4b90f-e70d-442e-8bad-62979883cf52	Nausea	A sensation of unease and discomfort in the stomach with an urge to vomit.	2024-12-04 00:14:33.849	2024-12-04 00:14:33.849
0dfccef2-8f97-4976-a8fc-2b06aedffd5b	Vomiting	Forcible voluntary or involuntary emptying of stomach contents through the mouth.	2024-12-04 00:14:33.849	2024-12-04 00:14:33.849
a7eb3570-c7bb-465f-9fdc-2c5b1be12972	Diarrhea	Frequent loose or liquid bowel movements.	2024-12-04 00:14:33.85	2024-12-04 00:14:33.85
70dad540-a066-4d09-828f-53fedc021ebe	Loss of Smell	Reduced or inability to smell, known as anosmia.	2024-12-04 00:14:33.851	2024-12-04 00:14:33.851
65e4dd6f-70f1-4992-bbb4-6a9ba3fd1d34	Loss of Taste	Reduced or inability to taste, often associated with anosmia.	2024-12-04 00:14:33.852	2024-12-04 00:14:33.852
2715ca0a-3012-48b4-946e-5d71006246ca	Chills	Cold sensations accompanied by shivering.	2024-12-04 00:14:33.852	2024-12-04 00:14:33.852
cf9ecc2c-4a33-4385-957c-20a79367483f	Muscle Pain	Pain or discomfort in the muscles, also known as myalgia.	2024-12-04 00:14:33.853	2024-12-04 00:14:33.853
32d324ca-b7ac-47fa-8f0f-e6a3bc0a4fa3	Joint Pain	Pain, discomfort, or stiffness in the joints.	2024-12-04 00:14:33.854	2024-12-04 00:14:33.854
61e9d87b-cb46-4ace-83d3-7fa990c273ee	Runny Nose	Excess drainage from the nose.	2024-12-04 00:14:33.854	2024-12-04 00:14:33.854
81007cfa-7fd1-4576-8703-5da66350ea46	Congestion	A feeling of stuffiness in the nasal passages.	2024-12-04 00:14:33.855	2024-12-04 00:14:33.855
c09c5681-8831-49ac-950a-434705e150fc	Dizziness	A feeling of lightheadedness, unsteadiness, or vertigo.	2024-12-04 00:14:33.855	2024-12-04 00:14:33.855
aeaf8efd-3162-40c1-8bd2-2706d37b2990	Chest Pain	Discomfort or pain in the chest, may indicate a serious condition.	2024-12-04 00:14:33.856	2024-12-04 00:14:33.856
65ee16d7-8103-4524-859a-66d45564da19	Rash	Changes in skin appearance, such as redness, bumps, or itchiness.	2024-12-04 00:14:33.856	2024-12-04 00:14:33.856
b11b704c-a1f7-46cd-aa19-466b7b326efb	Abdominal Pain	Discomfort or pain in the stomach area.	2024-12-04 00:14:33.857	2024-12-04 00:14:33.857
2027e809-fefd-4a73-ba4c-87a82dac9626	Swelling	An abnormal enlargement of a body part due to fluid buildup or inflammation.	2024-12-04 00:14:33.857	2024-12-04 00:14:33.857
1db8703d-cf66-4604-adef-01dccc74e652	Blurred Vision	Lack of sharpness in vision or inability to see fine details.	2024-12-04 00:14:33.858	2024-12-04 00:14:33.858
8deffe7f-a821-4cbe-a3c3-8502190fef23	Itching	A tingling or irritating sensation that makes you want to scratch the affected area.	2024-12-04 00:14:33.858	2024-12-04 00:14:33.858
74f0e932-f235-4788-8603-5dcc23a95c64	Skin Redness	Red discoloration of the skin caused by irritation or inflammation.	2024-12-04 00:14:33.859	2024-12-04 00:14:33.859
f2c0e28c-4bc1-4a57-a2ac-d0a8ab2b4172	Dry Mouth	A lack of saliva leading to a dry or parched feeling in the mouth.	2024-12-04 00:14:33.859	2024-12-04 00:14:33.859
206094f0-74b5-4562-9ca6-aaa09fbdb6c8	Sweating	Excessive perspiration, often caused by heat or stress.	2024-12-04 00:14:33.86	2024-12-04 00:14:33.86
f5228295-99c9-4ec6-bd8a-499f92bfe8dd	Palpitations	A feeling of a fast, pounding, or irregular heartbeat.	2024-12-04 00:14:33.86	2024-12-04 00:14:33.86
61303cc3-6d52-4af9-8bd7-55733ab36318	Tingling	A prickling or "pins and needles" sensation, usually felt in the extremities.	2024-12-04 00:14:33.861	2024-12-04 00:14:33.861
b2470158-fa46-457d-8ed2-2c662784b8a7	Weakness	A lack of physical strength or energy.	2024-12-04 00:14:33.862	2024-12-04 00:14:33.862
8810fce4-47a9-4261-87b4-060e79b83081	Back Pain	Discomfort or pain in the upper, middle, or lower back.	2024-12-04 00:14:33.862	2024-12-04 00:14:33.862
6876c453-f5f4-4d3e-b445-0bbf9da09c0c	Weight Loss	Unintentional decrease in body weight.	2024-12-04 00:14:33.863	2024-12-04 00:14:33.863
d9e89d4b-ce69-491d-88db-9a4a9af8da50	Weight Gain	Unintentional increase in body weight.	2024-12-04 00:14:33.863	2024-12-04 00:14:33.863
0bbbf648-ab92-4a8b-90d8-04517d5d32ae	Fainting	A temporary loss of consciousness due to reduced blood flow to the brain.	2024-12-04 00:14:33.864	2024-12-04 00:14:33.864
d251c4b3-2f56-400d-a1c1-dbca087b9896	Difficulty Swallowing	Trouble swallowing food or liquids, known as dysphagia.	2024-12-04 00:14:33.864	2024-12-04 00:14:33.864
693271c3-4a63-4071-a697-b738930753f6	Insomnia	Difficulty falling or staying asleep.	2024-12-04 00:14:33.865	2024-12-04 00:14:33.865
c0044ee1-5231-472c-8f79-70d2d981dc3a	Night Sweats	Excessive sweating during sleep, often drenching nightclothes and bedding.	2024-12-04 00:14:33.865	2024-12-04 00:14:33.865
bc195236-4885-4c7c-a7aa-8e6a5a55f0ad	Cold Hands and Feet	Unusually cold extremities, often caused by poor circulation.	2024-12-04 00:14:33.866	2024-12-04 00:14:33.866
4a4643fa-1d8c-484b-b7c6-ca29e53bb900	Numbness	Loss of sensation or feeling in part of the body.	2024-12-04 00:14:33.866	2024-12-04 00:14:33.866
13e08c7a-b3bd-406c-92bf-66fd9e82ba50	Hearing Loss	Partial or complete inability to hear sounds.	2024-12-04 00:14:33.867	2024-12-04 00:14:33.867
7615a336-e5b1-4060-9eea-6493eb2228b5	Ear Pain	Discomfort or pain in or around the ear.	2024-12-04 00:14:33.867	2024-12-04 00:14:33.867
ed081ce7-fc7a-45c6-b8e1-7138a6d2aea8	Difficulty Concentrating	Trouble focusing or maintaining attention on tasks.	2024-12-04 00:14:33.868	2024-12-04 00:14:33.868
8bf2a068-89d9-4eed-89bd-69ef6ce9077f	Memory Loss	Inability to remember events or information.	2024-12-04 00:14:33.868	2024-12-04 00:14:33.868
4ce90a1e-e3f6-40dc-85fc-503e490c8801	Mood Swings	Rapid changes in emotional state, such as going from happy to sad quickly.	2024-12-04 00:14:33.869	2024-12-04 00:14:33.869
4ce7a606-365e-44c5-8ae7-1b18f2a61074	Irritability	Excessive sensitivity or annoyance in response to stimuli.	2024-12-04 00:14:33.869	2024-12-04 00:14:33.869
fb9eac4a-ccf8-4840-a7df-631513b79f0c	Anxiety	Feelings of worry, fear, or unease, often without a clear cause.	2024-12-04 00:14:33.87	2024-12-04 00:14:33.87
22a27d49-36bb-416e-a4b5-301bfcd0e2f5	Depression	A persistent feeling of sadness, emptiness, or hopelessness.	2024-12-04 00:14:33.87	2024-12-04 00:14:33.87
e60941bd-7722-4fb4-a389-5206a5ef8078	Seizures	Sudden, uncontrolled electrical disturbances in the brain causing changes in behavior, movements, or consciousness.	2024-12-04 00:14:33.871	2024-12-04 00:14:33.871
178a707d-890d-4482-8f39-faf923f4b560	Tremors	Involuntary, rhythmic shaking of a body part, such as the hands or head.	2024-12-04 00:14:33.871	2024-12-04 00:14:33.871
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, password, "createdAt", "updatedAt", age, gender, role, nationality) FROM stdin;
b61afd07-8c5d-4e41-a044-3175bfa973f4	jdoe123	jdoe@mail.com	$2b$10$Q.ctpeSfyHw7n3d/fFnO2OpuvSs30VU1z9DUjuJRif.lYWcrRFvLS	2024-11-05 14:11:08.723	2024-11-05 14:11:08.723	45	MALE	PROVIDER	afce3b11-a317-4b7c-9b18-f45a420015b1
ba8d460a-6d89-48bf-949f-2e50a6e3bd8c	turk	christurk@mail.com	$2b$10$2sDDJaCGAo9NkY31ImqIletsoh9ZRTW6f/kJkalpwfuXjkOTqs4GS	2024-11-09 23:52:09.182	2024-11-09 23:52:09.182	26	MALE	PROVIDER	afce3b11-a317-4b7c-9b18-f45a420015b1
980bf908-71dd-419a-aa4a-fcc95da1a5dc	Tindra	tindra@mail.com	$2b$10$K2wTpR9WHEyXpsCvt8sHX.H7cwQn/s5UXRs6x7jsdHW2S5PBZD7BO	2024-10-23 13:04:21.069	2024-10-23 13:04:21.069	22	FEMALE	USER	0e6eee20-78e8-4a88-8025-25f7ce651c99
68ae6243-40f0-4bf8-8ade-91f7450995e3	vivian92	vivian92@mail.com	$2b$10$VZKb97xWW9grWvxnEWEKIukU6/fPmFSsvfvberjE0zr745g/.he9G	2024-11-08 16:12:53.551	2024-11-08 16:12:53.551	32	OTHER	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
5bd930c2-27a5-4f16-a04f-7600f2504844	billybob	billybob@mail.com	$2b$10$pilKQX035uCNH9DkvliUv.SV5Vw/250gKnr0d5xv/T1Mh.cmZgiXK	2024-10-12 09:23:45.123	2024-10-12 09:23:45.123	39	MALE	USER	b0ce4614-9771-4705-92b6-e1200beff423
a21d409f-8e4c-4119-83df-4d5f6be16598	kellyb	kellyb@mail.com	$2b$10$NHM15baSJECVnIYOrwMFw./QlfeJqXM/en8jI86nDdYg3TJvF/PwW	2024-10-25 10:13:00.461	2024-10-25 10:13:00.461	28	FEMALE	ADMIN	afce3b11-a317-4b7c-9b18-f45a420015b1
e0e05a2c-75e7-4d68-877e-952f973fba02	charliecool	cbooker@mail.com	$2b$10$rcb9MgULMe.nO3ijzbeMqO4dOzyoHWAikJ6QABA8SmPXai5crKil.	2024-11-10 18:20:22.585	2024-11-10 18:20:22.585	38	MALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
8ba8fee5-12c3-4e31-bde4-49f0530ca39b	bah	bah@mail.com	$2b$10$.FmDf8XtE.6k7.BJor1/OuKmD4g9AUQgjLQQn5lAJpOS5VC3/.VJa	2024-10-17 00:14:32.307	2024-10-17 00:14:32.307	32	FEMALE	USER	298b0be4-ee87-4e20-b8b2-77b409aa64b4
add1461a-8b13-4afc-b56a-48ddfd4de91c	madde	madde@mail.com	$2b$10$y3Zk/SgJMNK0DRbBZiNBku30AHZAKK4kiuuFils5xwIPF/M9iOqq.	2024-11-02 00:48:58.95	2024-11-02 00:48:58.95	35	FEMALE	USER	298b0be4-ee87-4e20-b8b2-77b409aa64b4
928e323d-a9da-41e2-a69a-21d8410c5d0f	karamellen	karamell@mail.com	$2b$10$sE1IE1ys93VIM.YPm3QggOXVLRmRV.aMhET5myIvdjCi85wLZHEBq	2024-10-28 13:16:33.659	2024-10-28 13:16:33.659	29	MALE	USER	a2c732a3-1d33-42b8-94f9-c9f56f0339bb
8d81ea24-916c-4bef-8751-4f3cb246ba29	kalle	kalle@mail.com	$2b$10$43Keuihou1dompVOa8EdlexiwtkTbm4jt4ZbNKxHJlU3bjcnjgZ3e	2024-11-01 23:54:26.697	2024-11-01 23:54:26.697	21	MALE	USER	5f8763a3-7697-4762-ba72-2da2ca1d09b1
75fa9e1e-6b7c-44cc-b1cc-fefc2e035192	bertil	bertilsteen@mail.com	$2b$10$fTNuJatSIACeqROSxMxvGeTlNdRq0glNdKr0mbcBkgOohhcJPH4iS	2024-11-07 23:56:32.92	2024-11-07 23:56:32.92	67	FEMALE	USER	298b0be4-ee87-4e20-b8b2-77b409aa64b4
46545064-8315-438b-bdd0-473fe1627ece	susan	susan@example.com	$2b$10$87X46zNAI55VWX7nIr8lOusVv6/tKrpNLGhB.4PTU2Q4ySUj8Hlpu	2024-11-11 20:06:45.299	2024-11-11 20:06:45.299	30	FEMALE	USER	3a6be9bd-6450-4d76-b05f-78e9e1135c14
8237ca9b-4d03-424b-a409-e1a887362c22	alex	alex@example.com	$2b$10$YHjoHLZhGRNNoidButOQi.2V..6LjCVniKUaJKDiG0iCUPA1tw60a	2024-10-30 20:06:56.946	2024-10-30 20:06:56.946	22	MALE	USER	b0ce4614-9771-4705-92b6-e1200beff423
12c68731-8468-4488-a129-aca361597448	patricia	patricia@example.com	$2b$10$BPbLIj5QdaBhXx35wYmCDeliCfmOcGtzDBPF6bZAxqWZgtXUPx1K6	2024-11-04 20:07:07.041	2024-11-04 20:07:07.041	45	FEMALE	USER	c2e88cd6-050c-4340-bd3e-a8e0536556b6
7dbafb09-847a-45e0-9143-9a0fdce22300	juan	juan@example.com	$2b$10$pcGQxddtiQLkVcS4iqHVQ.1ZFjllXIqCPNqsWvC8.XnHNv62sqBzu	2024-11-03 20:07:21.336	2024-11-03 20:07:21.336	38	MALE	USER	2478aea0-d8b0-4325-8bbf-13c9895fe06d
18565c3f-bd6b-4ed1-b484-80ef28cf48c4	maria	maria@example.com	$2b$10$V7g6dUT05AK.7Yhw5QwSVefgvwoazcODdFpx9a.vAlPyMPE2cmNBu	2024-11-14 20:07:30.42	2024-11-14 20:07:30.42	29	FEMALE	USER	44a379d9-175a-4f00-879a-4379db06646f
0bcc01bc-286f-4eaa-90c7-cbee4f3f260b	chris	chris@example.com	$2b$10$wTswREtHEHNSplaxzpisse5afyR7WFgz6mCoqrErtDySt4wQ5VRPa	2024-10-20 20:07:40.745	2024-10-20 20:07:40.745	33	MALE	USER	009f5771-bffd-48ca-98b5-4adcb951f470
1d1052bd-73eb-4091-9ffa-11c3b760cd6a	olga	olga@example.com	$2b$10$7JmBphdqsArD7RI/ObpExeLiokmI1WF0rWbqnl.Pz1bfLmape3Ppq	2024-11-12 20:07:47.652	2024-11-12 20:07:47.652	40	FEMALE	USER	5cb7f15b-db7c-473e-afcc-d600beedb87e
373a4571-f30d-4a7e-b709-2dc2cdcdf5cb	ryan	ryan@example.com	$2b$10$hOf6UYJvN719RTp2Vu9Nauq2YsGzfJmaPjbar1FyG8EIu6H7dhNFq	2024-11-13 20:07:56.249	2024-11-13 20:07:56.249	27	MALE	USER	43e0356f-894f-4bc9-a8f6-15987a87c105
ffa4d2ab-640f-47f2-9d9a-e394c4fa48d9	lena	lena@example.com	$2b$10$TfRfpteWDP06PFT5PtHaQOFKkUgVfTelYJPtRLwyLjtaoNw8iuDhe	2024-10-15 20:08:04.735	2024-10-15 20:08:04.735	24	FEMALE	USER	fc33b6d0-9f39-447b-a1c9-257805e40d82
735ae22b-b0b3-4433-8068-183d899f66d6	mike93	mike93@example.com	$2b$10$vdsyIOeuAWzCniQgGL7hse9O25p5HWGiKA9pQVtqkl0.R6ikYS08K	2024-11-16 20:08:31.527	2024-11-16 20:08:31.527	22	MALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
e6abe747-2c18-4dca-b0c4-57900fad2e7d	emilyrose	emilyrose@example.com	$2b$10$TzofBUn5ogYR3mKOtAFVF.t36/0HD.mSbcUObyzFqWyDt4o2CxKzK	2024-10-29 20:08:43.312	2024-10-29 20:08:43.312	40	FEMALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
a9a0eced-59ce-48e9-aa18-a60ad9a9ac6d	bobbyjohn	bobbyjohn@example.com	$2b$10$LB0GK8nQ1aOhr/KwV6Z2.OzO1NPw4rok5YYI/H.V0aWjE0MMbHGaW	2024-11-06 20:08:51.31	2024-11-06 20:08:51.31	26	MALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
e5554595-88a5-4b10-a2b7-a043760b9e7f	kristen	kristen@example.com	$2b$10$o6.FnH40e6MFGtARawaCBuiLmZORB5AFAUzqYht6fVj/.USwQc1z6	2024-10-13 20:08:59.843	2024-10-13 20:08:59.843	31	FEMALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
b5ae0796-311f-463b-aea1-2b222f11cc48	zachary	zachary@example.com	$2b$10$7CNBs87sF2zxeIsBcNfgv.fa1yV71fDIOWZ/ThhOjMP3WOBmy7XWq	2024-11-05 20:09:07.157	2024-11-05 20:09:07.157	24	MALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
416a7690-c78e-48fe-b838-7d52a6c9bb6e	amandaw	amandaw@example.com	$2b$10$njW0I5.Owfmq2Vo3jOuSkeU/xnHddRkDTYDaKlg9xQt5vKD78.U4i	2024-10-22 20:09:13.602	2024-10-22 20:09:13.602	29	FEMALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
fce87416-e00a-476d-8509-3dea88a26a58	matthew	matthew@example.com	$2b$10$Re2hPambTC2ZKDrheo1BvOZK2cYzwH/IBBzmZgTwkpjr8dhmFd.8i	2024-11-18 20:09:21.144	2024-11-18 20:09:21.144	36	MALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
542b747f-744c-4625-ab72-23053c64b710	samantha	samantha@example.com	$2b$10$WAoIVY9G0YpjToZSTNvX8O/mjQ4wy/labAzYz5jDowTJka5w97tZm	2024-11-17 20:09:27.249	2024-11-17 20:09:27.249	27	FEMALE	USER	afce3b11-a317-4b7c-9b18-f45a420015b1
\.


--
-- Data for Name: UserSymptomEntry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserSymptomEntry" ("logId", "symptomId", severity, "symptomStart", "symptomEnd", description) FROM stdin;
403ab102-8fe7-4a1f-ad33-90fe04f4dc52	32d324ca-b7ac-47fa-8f0f-e6a3bc0a4fa3	4	2024-12-01 00:00:00	2024-12-03 00:00:00	\N
403ab102-8fe7-4a1f-ad33-90fe04f4dc52	455434a8-a349-48f7-a662-4030f56a827e	6	2024-12-01 00:00:00	2024-12-01 00:00:00	\N
52a9d03c-233e-49d5-9122-dae16cb94c3c	037483ea-0f5d-4f30-8a3e-024b38807c87	6	2024-11-19 00:00:00	2024-11-22 00:00:00	\N
52a9d03c-233e-49d5-9122-dae16cb94c3c	2715ca0a-3012-48b4-946e-5d71006246ca	4	2024-11-19 00:00:00	2024-11-21 00:00:00	\N
52a9d03c-233e-49d5-9122-dae16cb94c3c	0ec99fc8-4990-49a1-b8c2-aada4217c92b	7	2024-11-21 00:00:00	2024-11-26 00:00:00	\N
da065d48-3b0b-423f-968e-eb312734571d	440d2dbc-cced-479a-af8e-7f9f396470eb	6	2024-11-26 00:00:00	2024-11-30 00:00:00	\N
da065d48-3b0b-423f-968e-eb312734571d	2715ca0a-3012-48b4-946e-5d71006246ca	8	2024-11-27 00:00:00	2024-11-30 00:00:00	\N
80927955-70d8-40ee-b545-f19db86e69c4	61e9d87b-cb46-4ace-83d3-7fa990c273ee	6	2024-12-01 00:00:00	2024-12-03 00:00:00	\N
1f5266bf-9031-4618-ab6c-a32843562302	440d2dbc-cced-479a-af8e-7f9f396470eb	5	2024-11-13 00:00:00	2024-11-20 00:00:00	\N
1f5266bf-9031-4618-ab6c-a32843562302	455434a8-a349-48f7-a662-4030f56a827e	6	2024-11-13 00:00:00	2024-11-14 00:00:00	\N
1f5266bf-9031-4618-ab6c-a32843562302	2715ca0a-3012-48b4-946e-5d71006246ca	2	2024-11-14 00:00:00	2024-11-16 00:00:00	\N
7b57450a-a19b-41e1-861c-f7149808e6d7	440d2dbc-cced-479a-af8e-7f9f396470eb	6	2024-12-01 00:00:00	2024-12-03 00:00:00	\N
7b57450a-a19b-41e1-861c-f7149808e6d7	455434a8-a349-48f7-a662-4030f56a827e	4	2024-12-01 00:00:00	2024-12-03 00:00:00	\N
298b740a-d1de-4b70-9a72-5a3bfc3b99e8	440d2dbc-cced-479a-af8e-7f9f396470eb	7	2024-12-01 00:00:00	2024-12-03 00:00:00	\N
dd59b9c3-2959-49f7-b219-4e95d7dd23e9	2715ca0a-3012-48b4-946e-5d71006246ca	5	2024-12-01 00:00:00	2024-12-03 00:00:00	\N
dd59b9c3-2959-49f7-b219-4e95d7dd23e9	455434a8-a349-48f7-a662-4030f56a827e	8	2024-12-01 00:00:00	2024-12-01 00:00:00	\N
8adc5867-85f3-4674-ab50-87568054b149	a7eb3570-c7bb-465f-9fdc-2c5b1be12972	10	2024-12-01 00:00:00	2024-12-01 00:00:00	\N
8adc5867-85f3-4674-ab50-87568054b149	c71d1347-8acf-47a9-90eb-b7893c96008e	5	2024-12-01 00:00:00	2024-12-02 00:00:00	\N
8adc5867-85f3-4674-ab50-87568054b149	b11b704c-a1f7-46cd-aa19-466b7b326efb	7	2024-12-01 00:00:00	2024-12-01 00:00:00	\N
8adc5867-85f3-4674-ab50-87568054b149	b2470158-fa46-457d-8ed2-2c662784b8a7	3	2024-12-01 00:00:00	2024-12-02 00:00:00	\N
c9f15bce-007f-4f6d-95dd-f5598860d96b	cef4b90f-e70d-442e-8bad-62979883cf52	4	2024-11-19 00:00:00	2024-11-21 00:00:00	\N
c9f15bce-007f-4f6d-95dd-f5598860d96b	b11b704c-a1f7-46cd-aa19-466b7b326efb	2	2024-11-19 00:00:00	2024-11-20 00:00:00	\N
\.


--
-- Data for Name: UserSymptomLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserSymptomLog" (id, "userId", "locationId", "recordedAt", "updatedAt") FROM stdin;
1f5266bf-9031-4618-ab6c-a32843562302	928e323d-a9da-41e2-a69a-21d8410c5d0f	f800a7df-5990-4fda-9751-93bb220148d5	2024-12-01 00:21:46.334	2024-12-01 00:21:46.334
298b740a-d1de-4b70-9a72-5a3bfc3b99e8	8237ca9b-4d03-424b-a409-e1a887362c22	742c9ae9-6d24-4bc0-bbbd-2cfa62a0ba6a	2024-11-29 00:23:07.628	2024-11-29 00:23:07.628
403ab102-8fe7-4a1f-ad33-90fe04f4dc52	1d1052bd-73eb-4091-9ffa-11c3b760cd6a	95188235-a0b0-436e-9a68-dcb44c96e65f	2024-12-02 00:17:03.925	2024-12-02 00:17:03.925
52a9d03c-233e-49d5-9122-dae16cb94c3c	416a7690-c78e-48fe-b838-7d52a6c9bb6e	61c62bea-88f5-43b7-9711-841e287a1b5a	2024-12-01 00:19:03.236	2024-12-01 00:19:03.236
7b57450a-a19b-41e1-861c-f7149808e6d7	e5554595-88a5-4b10-a2b7-a043760b9e7f	742c9ae9-6d24-4bc0-bbbd-2cfa62a0ba6a	2024-11-25 00:22:32.991	2024-11-25 00:22:32.991
8adc5867-85f3-4674-ab50-87568054b149	373a4571-f30d-4a7e-b709-2dc2cdcdf5cb	742c9ae9-6d24-4bc0-bbbd-2cfa62a0ba6a	2024-12-02 00:25:21.264	2024-12-02 00:25:21.264
c9f15bce-007f-4f6d-95dd-f5598860d96b	ffa4d2ab-640f-47f2-9d9a-e394c4fa48d9	46eaa6b8-bcad-4674-8e55-ff308ff29808	2024-12-03 00:26:16.355	2024-12-04 00:28:08.32
da065d48-3b0b-423f-968e-eb312734571d	8d81ea24-916c-4bef-8751-4f3cb246ba29	6fac01be-ff72-4252-a6f3-8deb8410d5f4	2024-12-04 00:20:09.321	2024-12-04 00:20:09.321
80927955-70d8-40ee-b545-f19db86e69c4	8d81ea24-916c-4bef-8751-4f3cb246ba29	6fac01be-ff72-4252-a6f3-8deb8410d5f4	2024-12-04 00:20:34.839	2024-12-04 00:20:34.839
dd59b9c3-2959-49f7-b219-4e95d7dd23e9	735ae22b-b0b3-4433-8068-183d899f66d6	742c9ae9-6d24-4bc0-bbbd-2cfa62a0ba6a	2024-12-04 00:23:48.711	2024-12-04 00:23:48.711
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8c1a2325-6ae5-4ffe-9b3a-42c71c178a41	080f1fa12417f6886c9c59a7ad41cc7d99290e7dfe729c1f49ad1d6549895252	2024-11-09 13:50:15.310658+00	20241106123401_init	\N	\N	2024-11-09 13:50:15.307491+00	1
5f5f199d-16a5-4901-9408-a1b891e69785	af2f848adaecf3eae101c6799736ce1ffc9f5a9e9efb9f1f1b375d8842755867	2024-11-09 13:50:15.31965+00	20241107103108_schema_v1	\N	\N	2024-11-09 13:50:15.311488+00	1
6e13b3d3-fc7a-4217-b17f-32afbf4c63b4	cf00f6721c967b52a7c9d17aac6888fff419fcf10d8985dcff54f689900ce5a8	2024-11-09 23:39:38.522069+00	20241109233938_add_cascade_delete	\N	\N	2024-11-09 23:39:38.517425+00	1
2ca52f21-fdea-4788-889b-25329330a32e	2ec28f6a2f8a0eb8d61594f55b0e827d7b69391f0b74b872ef4cbddf5286a5b7	2024-11-09 13:50:15.324994+00	20241107113153_schema_v3	\N	\N	2024-11-09 13:50:15.320641+00	1
495ef530-2b8c-487f-9287-04fd4400d605	cbdc9f46dac02c2da79b8f00c08635d741d6d09721f066a34766faa3dfcb9977	2024-11-09 13:50:15.328179+00	20241108121805_simplify_schema_models	\N	\N	2024-11-09 13:50:15.325808+00	1
51785a21-7293-444f-b0ae-fedb2c9e982b	519a0a0967c301bbdb8b6265d36aaa9af51f1fe59fb779f1eae392bf0ed58620	2024-11-09 13:50:15.333729+00	20241108131959_add_country	\N	\N	2024-11-09 13:50:15.329066+00	1
8f984ddc-5563-4179-81ba-4fe612139c46	f4d95b29534357578af286bf6969980abbf8a8548196dde65a0e87980856075c	2024-11-09 23:41:33.222679+00	20241109234133_add_updated_at_to_log	\N	\N	2024-11-09 23:41:33.219632+00	1
85a47855-b364-48c9-95d4-7e07fc36e7ca	61df0ed7865f9ed816e335f2e1f3cf6de299d2b910690a01e345255949bc42b3	2024-11-09 13:50:15.338936+00	20241108133000_fix_spelling_error	\N	\N	2024-11-09 13:50:15.334775+00	1
646b7fe7-07f3-40f8-a646-fb1bc99872a8	789182dac197a9fb9851b0adbd84f4905467b3541979ab157d0b36fe6d9ac5af	2024-11-09 13:50:15.343097+00	20241108133209_update_country_types	\N	\N	2024-11-09 13:50:15.339856+00	1
43458353-bbae-4acb-be5b-d1a03a48e8fd	510acdd541a535a33b74e53f6bca74582d194b33e7b2dfb6c7907b2850b246e0	2024-11-09 13:50:15.346195+00	20241108133256_update_country_remove_region	\N	\N	2024-11-09 13:50:15.344106+00	1
8d1e1a1f-66be-4e93-b3dd-df7449bb3037	32d1a2a7f0f2aece96bf48786c33adeebed6ab0949011ff7ea573e617d60a1be	2024-11-12 12:07:04.024018+00	20241112120704_	\N	\N	2024-11-12 12:07:04.020362+00	1
a645c9dd-cf66-48b2-9ade-1937f6edb5ce	567429a4d15c191715bc22c65770ce6bc2e5cc0e02aace8ef56dae57373b8694	2024-11-09 13:51:59.952337+00	20241109135159_update_user_with_nationality	\N	\N	2024-11-09 13:51:59.948445+00	1
d57edd4a-309a-4354-a2a0-3b5695ee2dc0	609b63de935096a2060d3110384f11a88ae1016d16c8193617465b5e160fcefe	2024-11-09 14:03:13.406153+00	20241109140313_simplify_country_model	\N	\N	2024-11-09 14:03:13.401548+00	1
00a2d14e-b386-401a-a9aa-82bb39a1dd73	b3ac7c4b2638cedc739444bda8a658c1c0bdfaa2c1576450ccbe34443b870a8b	2024-11-09 16:00:30.168469+00	20241109160030_remove_postal_code	\N	\N	2024-11-09 16:00:30.163976+00	1
ca2cc85d-a513-4362-891d-d2ad5d3ef807	23266720fa6330ce4bec4c932f8387c38f046f8eb8f989e55325b0132b7fd302	2024-11-19 12:39:01.422102+00	20241119123901_add_endpoint_activity_log	\N	\N	2024-11-19 12:39:01.417713+00	1
25de2e44-8ef1-4395-b095-836eca5aa8ea	347039e1545f6c0c4ad2d9145641681d4a12ca0b67be5203c6de747900cdacf6	2024-11-09 17:25:04.920498+00	20241109172504_location_lat_and_long_not_null	\N	\N	2024-11-09 17:25:04.917025+00	1
1e2727a7-9aae-4b68-a1cd-07b982fd010a	22423028b5b66455c998db75de53e17cff1126c0ed93b495bd12bc6bdd06c709	2024-11-09 21:15:39.674062+00	20241109211539_add_composite_key_to_user_entry	\N	\N	2024-11-09 21:15:39.669323+00	1
\.


--
-- Name: ActivityLog ActivityLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_pkey" PRIMARY KEY (id);


--
-- Name: Country Country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (id);


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- Name: ProviderProfile ProviderProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProviderProfile"
    ADD CONSTRAINT "ProviderProfile_pkey" PRIMARY KEY (id);


--
-- Name: Symptom Symptom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Symptom"
    ADD CONSTRAINT "Symptom_pkey" PRIMARY KEY (id);


--
-- Name: UserSymptomEntry UserSymptomEntry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSymptomEntry"
    ADD CONSTRAINT "UserSymptomEntry_pkey" PRIMARY KEY ("logId", "symptomId");


--
-- Name: UserSymptomLog UserSymptomLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSymptomLog"
    ADD CONSTRAINT "UserSymptomLog_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Country_alpha2_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Country_alpha2_idx" ON public."Country" USING btree (alpha2);


--
-- Name: Country_alpha2_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Country_alpha2_key" ON public."Country" USING btree (alpha2);


--
-- Name: Country_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Country_name_key" ON public."Country" USING btree (name);


--
-- Name: Location_city_state_countryId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Location_city_state_countryId_key" ON public."Location" USING btree (city, state, "countryId");


--
-- Name: Location_latitude_longitude_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Location_latitude_longitude_key" ON public."Location" USING btree (latitude, longitude);


--
-- Name: ProviderProfile_providerId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProviderProfile_providerId_key" ON public."ProviderProfile" USING btree ("providerId");


--
-- Name: Symptom_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Symptom_name_key" ON public."Symptom" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: ActivityLog ActivityLog_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ActivityLog ActivityLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Location Location_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProviderProfile ProviderProfile_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProviderProfile"
    ADD CONSTRAINT "ProviderProfile_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProviderProfile ProviderProfile_providerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProviderProfile"
    ADD CONSTRAINT "ProviderProfile_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserSymptomEntry UserSymptomEntry_logId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSymptomEntry"
    ADD CONSTRAINT "UserSymptomEntry_logId_fkey" FOREIGN KEY ("logId") REFERENCES public."UserSymptomLog"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserSymptomEntry UserSymptomEntry_symptomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSymptomEntry"
    ADD CONSTRAINT "UserSymptomEntry_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES public."Symptom"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserSymptomLog UserSymptomLog_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSymptomLog"
    ADD CONSTRAINT "UserSymptomLog_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserSymptomLog UserSymptomLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserSymptomLog"
    ADD CONSTRAINT "UserSymptomLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_nationality_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_nationality_fkey" FOREIGN KEY (nationality) REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

