package com.bezkoder.springjwt.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "employeeloginhistory")
public class EmployeeLoginHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "logid")
    private Integer logId;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    @Column(name = "logintime")
    private Date loginTime;

    @Column(name = "logouttime")
    private Date logoutTime;

    // Constructors, getters, and setters
}
