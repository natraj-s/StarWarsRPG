/**
 * TO ADD:
 * incremental damage increase to characters
 * fix bug in switching characters
 * remove character from opponents once defeated
 * won game message
 * reset game
 * graceful popping open upcoming opponents
 * effects on attacking and receiving dmg
 */

var thePlayers = ["luke", "han", "yoda", "kylo", "darth", "palp"];

$(document).ready(function () {
    var playersSelected = false;
    var player1Selected = false;
    var player2Selected = false;
    $("#fight").addClass("hidden");
    $(".fight").attr("disabled", true);
    $("#attack").addClass("hidden");
    $(".attack").attr("disabled", true);
    $(".confirm").attr("disabled", true);
    var player1 = "";
    var player2 = "";
    var opponents = [];
    var charId = "";
    var player1Id = "";
    var player2Id = "";

    var setCharData = function () {
        $("#luke").data("health", "100");
        $("#luke").data("attack", "8");

        $("#han").data("health", "100");
        $("#han").data("attack", "6");

        $("#yoda").data("health", "100");
        $("#yoda").data("attack", "20");

        $("#kylo").data("health", "100");
        $("#kylo").data("attack", "12");

        $("#darth").data("health", "100");
        $("#darth").data("attack", "18");

        $("#palp").data("health", "100");
        $("#palp").data("attack", "16");
    }

    // Credits: http://jsfiddle.net/HrJku/1/
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if (new Date().getTime() - start > milliseconds) {
                break;
            }
        }
    }

    setCharData();

    $(".fight").click(function (event) {
        $(".char").attr("disabled", true);
        $("#talkToPlayer").text("");
        $("#talkToPlayer").addClass("hidden");
        $(this).attr("disabled", true);
        $("#fight").addClass("hidden");
        $("#attack").removeClass("hidden");
        $(".attack").attr("disabled", false);
    });

    /* THE GAME */
    $(".attack").click(function () {
        var player1hp = $(player1Id).data("health");
        var player2hp = $(player2Id).data("health");
        var player1attack = $(player1Id).data("attack");
        var player2attack = $(player2Id).data("attack");

        console.log("PLAYER 1 HEALTH: " + player1hp);
        console.log("PLAYER 2 HEALTH: " + player2hp);

        if (parseInt(player2hp) > 0) {
            console.log("Attacking " + player2);
            player2hp -= player1attack;
            console.log("Attacked " + player2 + "for " + player1attack + " damage");
            console.log("PLAYER 1 HEALTH: " + player1hp);
            console.log("PLAYER 2 HEALTH: " + player2hp);
            $("#player2").parent().find("#healthbar").width(player2hp + "%");
            $(player2Id).data("health", player2hp);
            // sleep(2000);

            if (parseInt(player2hp) <= 0) {
                console.log(player1 + " defeated " + player2);
                if (opponents.length > 0) {
                    player2 = opponents.shift();
                    player2Id = "#" + player2;
                    $("#player2").css("background-image", "url(assets/images/" + player2 + ".jpg)");
                    $("#player2").parent().find("#healthbar").width($(player2Id).data("health") + "%");
                    $("#player2").parent().find("#attackbar").width($(player2Id).data("attack") + "%");
                    $("p").removeClass(player2Id);
                }
                else {
                    console.log("You won today");
                }
            }
        }
        else {

        }

        if (parseInt(player1hp) > 0) {
            player1hp -= player2attack;
            console.log(player2 + " attacked " + player1 + "for " + player2attack + " damage");
            console.log("PLAYER 1 HEALTH: " + player1hp);
            console.log("PLAYER 2 HEALTH: " + player2hp);
            $("#player1").parent().find("#healthbar").width(player1hp + "%");
            $(player1Id).data("health", player1hp);
            // sleep(2000);
        }
    });

    $(".confirm").click(function (event) {
        if (!player1Selected) {
            player1Selected = true;
            $("#talkToPlayer").text("CHOOSE YOUR OPPONENTS");
            $(charId).attr("disabled", true);
            $(".confirm").attr("disabled", true);

            player1Id = "#" + player1;
        }
        else {
            player2Selected = true;
            playersSelected = true;
            $(this).attr("disabled", true);
            $(charId).attr("disabled", true);
            $(".fight").attr("disabled", false);
            $("#confirm").addClass("hidden");
            $("#fight").removeClass("hidden");
            $("#talkToPlayer").text("YOU CAN DUEL IT OUT OR ADD MORE OPPONENTS");

            player2Id = "#" + player2;
        }
    })

    $(".char").click(function (event) {
        var charName = event.target.id;
        charId = "#" + charName;
        $(".confirm").attr("disabled", false);

        if (!playersSelected) {
            // var bgurl = "url(assets/images/" + charName + ".jpg)";
            // var bgName = $("#player1").css("background-image").split("/").pop();
            // bgName = bgName.substr(0, bgName.length - 2);

            // if (bgName === "playerbg.jpg") {
            if (!player1Selected) {
                $("#player1").css("background-image", "url(assets/images/" + charName + ".jpg)");
                $("#talkToPlayer").text("CONFIRM YOUR CHOICE FOR PLAYER 1");
                player1 = charName;
                setBars("player1", player1);
            }
            else {
                $("#player2").css("background-image", "url(assets/images/" + charName + ".jpg)");
                $("#talkToPlayer").text("CONFIRM YOUR CHOICE FOR PLAYER 2");
                player2 = charName;
                setBars("player2", player2);
            }

        }
        else {
            $("#opponents").removeClass("hidden");
            $(charId).attr("disabled", true);
            var para = $("<p>");
            para.attr("id", $(this).attr("id"));
            var btn = $("<button>");
            btn.attr("id", $(this).attr("id"));
            btn.attr("disabled", true);
            btn.html($(this).text());
            para.append(btn);
            $("#opponents").append(para);
            opponents.push(charName);

        }
    });

    var setBars = function (player, charName) {
        var ch
        if (player === "player1") {
            $("#player1").parent().find("#healthbar").width($(charId).data("health") + "%");
            $("#player1").parent().find("#attackbar").width($(charId).data("attack") + "%");
        }
        else {
            $("#player2").parent().find("#healthbar").width($(charId).data("health") + "%");
            $("#player2").parent().find("#attackbar").width($(charId).data("attack") + "%");
        }
    }


});

