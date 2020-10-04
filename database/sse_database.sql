create table hash_numbers
(
    id     int          not null
        primary key,
    number varchar(255) null
);

create table polling_places
(
    id        int auto_increment
        primary key,
    phone     varchar(255)         null,
    name      varchar(255)         null,
    address   varchar(255)         null,
    precincts varchar(255)         null,
    status    tinyint(1) default 1 null
);

create table calculated_times
(
    id              int      not null
        primary key,
    pollingplace_id int      null,
    timestamp       datetime null,
    estimated_time  int      null,
    constraint calculated_times_polling_places_id_fk
        foreign key (pollingplace_id) references polling_places (id)
            on update cascade
);

create table wait_times
(
    id              int auto_increment
        primary key,
    timestamp       datetime     null,
    original_time   varchar(255) null,
    parsed_time     int          null,
    pollingplace_id int          null,
    phone_id        int          null,
    constraint wait_times_hash_numbers_id_fk
        foreign key (phone_id) references hash_numbers (id)
            on update cascade,
    constraint wait_times_polling_places_id_fk
        foreign key (pollingplace_id) references polling_places (id)
            on update cascade
);


--Database code goes here