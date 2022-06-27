create table user(
    id integer primary key autoincrement,
    email unique,
    password varchar(255),
    nom varchar(150),
    prenom varchar(150),
    job varchar(150),
    departement varchar(150)
);

-- INSERT INTO user (nom, prenom, job, departement) values('joelle', 'mantey', 'developpeuse', 'web')

create table post(
    id integer primary key autoincrement,
    contenu text,
    contenu_multimedias varchar (150),
    user_id integer,
    foreign key (user_id) references user(id)
);

