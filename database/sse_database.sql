create table if not exists locations
(
    id        int auto_increment
        primary key,
    phone     varchar(255)         null,
    name      varchar(255)         null,
    address   varchar(255)         null,
    precincts varchar(255)         null,
    status    tinyint(1) default 1 null,
    lat       double               null,
    lon       double               null
);

create table if not exists numbers
(
    id          int auto_increment
        primary key,
    number      varchar(255)         null,
    whitelisted tinyint(1) default 0 null
);

create table if not exists reports
(
    id            int auto_increment
        primary key,
    timestamp     datetime     null,
    original_time varchar(255) null,
    parsed_time   int          null,
    location_id   int          null,
    constraint reports_locations_id_fk
        foreign key (location_id) references locations (id)
);

create table if not exists times
(
    id             int auto_increment
        primary key,
    timestamp      datetime null,
    estimated_time int      null,
    location_id    int      null,
    constraint times_locations_id_fk
        foreign key (location_id) references locations (id)
);

create table if not exists users
(
    id       int auto_increment
        primary key,
    username varchar(255) not null,
    password varchar(64)  not null,
    constraint users_password_uindex
        unique (password),
    constraint users_username_uindex
        unique (username)
);