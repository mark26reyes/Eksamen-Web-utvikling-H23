﻿// <auto-generated />
using System;
using F1API.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace F1API.Migrations
{
    [DbContext(typeof(F1Context))]
    [Migration("20250402121040_ConfigureDriverRaceRelations")]
    partial class ConfigureDriverRaceRelations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true);

            modelBuilder.Entity("DriverRace", b =>
                {
                    b.Property<int>("DriversId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RacesId")
                        .HasColumnType("INTEGER");

                    b.HasKey("DriversId", "RacesId");

                    b.HasIndex("RacesId");

                    b.ToTable("DriverRaces", (string)null);
                });

            modelBuilder.Entity("F1API.Models.Driver", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Age")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nationality")
                        .HasColumnType("TEXT");

                    b.Property<int?>("TeamId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("F1API.Models.Race", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("GrandPrix")
                        .HasColumnType("TEXT");

                    b.Property<int>("NumberOfLaps")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("WinnerId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("WinnerName")
                        .HasColumnType("TEXT");

                    b.Property<string>("WinnerTime")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("WinnerId");

                    b.ToTable("Races");
                });

            modelBuilder.Entity("F1API.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("DriverRace", b =>
                {
                    b.HasOne("F1API.Models.Driver", null)
                        .WithMany()
                        .HasForeignKey("DriversId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("F1API.Models.Race", null)
                        .WithMany()
                        .HasForeignKey("RacesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("F1API.Models.Driver", b =>
                {
                    b.HasOne("F1API.Models.Team", "Team")
                        .WithMany("Drivers")
                        .HasForeignKey("TeamId");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("F1API.Models.Race", b =>
                {
                    b.HasOne("F1API.Models.Driver", "Winner")
                        .WithMany()
                        .HasForeignKey("WinnerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Winner");
                });

            modelBuilder.Entity("F1API.Models.Team", b =>
                {
                    b.Navigation("Drivers");
                });
#pragma warning restore 612, 618
        }
    }
}
