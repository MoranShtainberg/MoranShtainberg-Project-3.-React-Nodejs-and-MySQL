-- create database vacation_project_moran;
-- use vacation_project_moran;

-- create table users(
--     user_id int auto_increment,
--     first_name varchar(255),
--     last_name varchar(255),
-- 	username varchar(255),
--     password varchar(255),
--     isAdmin bool default 0,
--     primary key (user_id)
-- );

-- insert into users(first_name, last_name, username,password,isAdmin)
-- values ("Adi","Min","adi_min",'$2b$10$RBlgzCsqrFuFkot24jPhkO/fLMHyQMx3V8Wz8CWxl5eaGAZ9TqTPa',TRUE);

-- insert into users(first_name, last_name, username,password,isAdmin)
-- values ("Guy","Someyoung","s_y_g",'$2b$10$RBlgzCsqrFuFkot24jPhkO/fLMHyQMx3V8Wz8CWxl5eaGAZ9TqTPa',false),("Eishe","Carlo","carlomeod",'$2b$10$RBlgzCsqrFuFkot24jPhkO/fLMHyQMx3V8Wz8CWxl5eaGAZ9TqTPa',false);

-- create table vacations(
-- 	   Vac_id int auto_increment,
--     vac_destination varchar(255),
--     vac_description text,
--     vac_pic text,  
--     from_date date,
--     to_date date,
--     price int,
--     vac_followers int,
--     primary key (Vac_id)
-- );

-- insert into vacations(vac_destination, vac_description, vac_pic, from_date, to_date, price)
-- values ("Thailand","5 star hotel on the magical island of Ko Pha Ngan","https://upload.wikimedia.org/wikipedia/commons/f/fd/Koh_Phangan01.jpg","2021-08-01","2021-08-12",1777);

-- insert into vacations(vac_destination, vac_description, vac_pic, from_date, to_date, price)
-- values ("Budapest","The capital and the most populous city of Hungary","https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Hungarian_Parliament_By_River_Danube.jpg/1280px-Hungarian_Parliament_By_River_Danube.jpg","2021-07-14","2021-07-17",656),
-- 	   ("New York City","Days and nights in a city that does not go to sleep","https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lower_Manhattan_skyline_-_June_2017.jpg/1920px-Lower_Manhattan_skyline_-_June_2017.jpg","2021-09-05","2021-09-16",2555);

-- create table bridge (
-- 	bridge_id int auto_increment,
--     br_user_id int,
--     br_Vac_id int,
--     primary key(bridge_id),
--     foreign key(br_user_id) references users(user_id),
--     foreign key(br_Vac_id) references vacations(Vac_id)    
-- );

-- insert into bridge(br_user_id, br_Vac_id)
-- values (2,1),(2,2),(3,2);



