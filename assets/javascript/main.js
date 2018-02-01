/**
 * TO ADD:
 * graceful popping open upcoming opponents
 * effects on attacking and receiving dmg
 */

$(document).ready(function () {
    var playersSelected = false;
    var player1Selected = false;
    var player2Selected = false;
    $("#reset").addClass("hidden");
    $(".reset").attr("disabled", true);
    $("#fight").addClass("hidden");
    $(".fight").attr("disabled", true);
    $("#attack").addClass("hidden");
    $(".attack").attr("disabled", true);
    $(".confirm").attr("disabled", true);
    var player1 = "";
    var player2 = "";
    var player2Name = "";
    var opponents = [];
    var charId = "";
    var player1Id = "";
    var player2Id = "";

    // SETS DATA ATTRIBUTES FOR EACH CHARACTER ID
    var setCharData = function () {
        $("#luke").data("health", "200");
        $("#luke").data("attack", "3");
        $("#luke").data("gain", "5");

        $("#han").data("health", "200");
        $("#han").data("attack", "3");
        $("#han").data("gain", "4");

        $("#yoda").data("health", "200");
        $("#yoda").data("attack", "12");
        $("#yoda").data("gain", "3");

        $("#kylo").data("health", "200");
        $("#kylo").data("attack", "7");
        $("#kylo").data("gain", "4");

        $("#darth").data("health", "200");
        $("#darth").data("attack", "10");
        $("#darth").data("gain", "2");

        $("#palp").data("health", "200");
        $("#palp").data("attack", "9");
        $("#palp").data("gain", "2");
    }

    // SETS A CHAR NAME FOR DISPLAY PURPOSES
    var setCharName = function () {
        if (player2 === "luke") {
            player2Name = "LUKE SKYWALKER";
        }
        if (player2 === "han") {
            player2Name = "HAN SOLO";
        }
        if (player2 === "yoda") {
            player2Name = "MASTER YODA";
        }
        if (player2 === "kylo") {
            player2Name = "KYLO REN";
        }
        if (player2 === "darth") {
            player2Name = "DARTH VADER";
        }
        if (player2 === "palp") {
            player2Name = "THE EMPEROR";
        }
    }

    // SETS DATA ATTRIBUTES WHICH NEVER GET MODIFIED AS SOON AS DOCUMENT LOADS
    setCharData();

    // THE FIGHT BUTTON POPS UP AND STAYS ONCE THE USER HAS CLICKED CONFIRM
    // ON PLAYER 2. AS LONG AS THE USER DOESN'T CLICK THE FIGHT BUTTON, THE USER
    // CAN ADD ENEMIES TO FIGHT AGAINST. 
    // ONCE THE FIGHT BUTTON GETS CLICKED, IT DISABLES FURTHER CHARACTER SELECTION, 
    // HIDES MESSAGES VISIBLE TO THE USER, HIDES ITSELF AND DISPLAYS TO THE PLAYER
    // AN ATTACK BUTTON IN ITS PLACE.

    $(".fight").click(function (event) {
        $(".char").attr("disabled", true);
        $("#talkToPlayer").css("visibility", "hidden");
        $(this).attr("disabled", true);
        $("#fight").addClass("hidden");
        $("#attack").removeClass("hidden");
        $(".attack").attr("disabled", false);
        setCharName();
    });

    /* THE GAME */
    $(".attack").click(function () {
        var player1hp = $(player1Id).data("health");
        var player2hp = $(player2Id).data("health");
        var player1attack = $(player1Id).data("attack");
        var player2attack = $(player2Id).data("attack");
        var player1gain = $(player1Id).data("gain");

        // AS LONG AS PLAYER 2'S HEALTH IS ABOVE 0
        if (parseInt(player2hp) > 0) {
            // console.log("\n" + player1 + " HEALTH: " + player1hp);
            // console.log(player2 + " HEALTH: " + player2hp);
            // console.log("Attacking " + player2 + "\n");

            player2hp -= player1attack;
            $("#player2").addClass("shakeIt");
            window.setTimeout(function () {
                $("#player2").removeClass("shakeIt");
            }, 1000);
            // INCREMENT PLAYER 1'S ATTACK POWER BY THE GAIN DATA-ATTRIBUTE
            $(player1Id).data("attack", parseInt(player1attack) + parseInt(player1gain) + "");

            // console.log("Attacked " + player2 + " for " + player1attack + " damage");
            // console.log("PLAYER 1 HEALTH: " + player1hp);
            // console.log("PLAYER 2 HEALTH: " + player2hp);

            // UPDATE HEALTH AND ATTACK BARS ACCORDINGLY
            $("#player1").parent().find("#attackbar").width(parseInt(player1attack) / 2 + "%");
            $("#player2").parent().find("#healthbar").width(parseInt(player2hp) / 2 + "%");
            $(player2Id).data("health", player2hp);

            // CHECKS FOR PLAYER 2'S HEALTH HERE ITSELF SO IT DOESN'T HAVE TO
            // WAIT UNTIL THE NEXT ATTACK BUTTON CLICK TO BRING IN ANY 
            // FURTHER OPPONENTS OR TO DISPLAY THE APPROPRIATE MESSAGES
            if (parseInt(player2hp) <= 0) {
                $("#talkToPlayer").text("YOU DEFEATED " + player2Name);
                $("#talkToPlayer").css("visibility", "visible");
                $("#player2").css("background-image", "url(assets/images/" + player2 + "defeated.jpg)");

                if (opponents.length > 0) {
                    window.setTimeout(bringInOpponent, 2000);
                    // HIDES THE UPCOMING OPPONENTS COLUMN IF THERE ARE NO MORE.
                }
                else {
                    $("#talkToPlayer").text("YOU WON THE BATTLE TODAY, BUT THE WAR CONTINUES. MAY THE FORCE BE WITH YOU!");
                    $("#talkToPlayer").css("visibility", "visible");
                    $(".attack").attr("disabled", true);
                    $("#attack").addClass("hidden");
                    $("#reset").removeClass("hidden");
                    $(".reset").attr("disabled", false);
                }
            }
        }
        // PLAYER 2 ATTACKS PLAYER 1 ONLY IF BOTH HAVE HEALTH ABOVE 0
        if (parseInt(player1hp) > 0 && parseInt(player2hp) > 0) {
            player1hp -= player2attack;
            $("#player1").addClass("shakeIt");
            window.setTimeout(function () {
                $("#player1").removeClass("shakeIt");
            }, 1000);

            // console.log(player2 + " attacked " + player1 + " for " + player2attack + " damage");
            // console.log("\n" + player1 + " HEALTH: " + player1hp);
            // console.log(player2 + " HEALTH: " + player2hp);

            $("#player1").parent().find("#healthbar").width(parseInt(player1hp) / 2 + "%");
            $(player1Id).data("health", player1hp);

            // CHECKS FOR PLAYER 1'S HEALTH IF IT'S ABOVE 0 AND UPDATES
            // AND DISPLAYS THE APPROPRIATE MESSAGES ACCORDINGLY
            if (parseInt(player1hp) <= 0) {
                $("#talkToPlayer").text("YOU WERE DEFEATED BY " + player2Name);
                $("#talkToPlayer").css("visibility", "visible");
                $("#player1").css("background-image", "url(assets/images/" + player1 + "defeated.jpg)");
                $(".attack").attr("disabled", true);
                $("#attack").addClass("hidden");
                $("#reset").removeClass("hidden");
                $(".reset").attr("disabled", false);
            }
        }
    });

    // BRINGS IN THE NEXT OPPONENT BY SETTING THE PLAYER 2 BG TO
    // THE NEXT OPPONENT'S IMAGE AND REMOVING HIM/HER FROM THE 
    // UPCOMING OPPONENTS LIST
    var bringInOpponent = function () {
        player2 = opponents.shift();
        player2Id = "#" + player2;
        var opponentClass = ".opponent-" + player2;
        console.log("OpponentClass: " + opponentClass);
        $(opponentClass).parent().remove();
        $("#player2").css("background-image", "url(assets/images/" + player2 + ".jpg)");
        $("#player2").parent().find("#healthbar").width(parseInt($(player2Id).data("health")) / 2 + "%");
        $("#player2").parent().find("#attackbar").width(parseInt($(player2Id).data("attack")) / 2 + "%");
        $("p").removeClass(player2Id);
        setCharName();
        if (opponents.length === 0) {
            $("#opponents").addClass("hidden");
        }
    }

    // SETS FLAGS LIKE PLAYER1SELECTED AND PLAYER2SELECTED
    // TO SIGNAL TO THE .CHAR EVENT LISTENER WHERE TO DISPLAY
    // THE CHARACTER BACKGROUND
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

    // EVENT LISTENER FOR CLICKS ON EACH CHARACTER AVATAR 
    $(".char").click(function (event) {
        var charName = event.target.id;
        charId = "#" + charName;
        $(".confirm").attr("disabled", false);

        // PLAYERSELECTED IS A BOOLEAN THAT GETS SET ONCE THE USER CLICKS
        // CONFIRM FOR BOTH SELECTIONS. 
        if (!playersSelected) {

            // PLAYER1SELECTED/PLAYER2SELECTED IS A BOOLEAN THAT GETS SET BY THE CONFIRM BUTTON
            // EVENT LISTENER ONCE THE USER CLICKS CONFIRM ON A CHARACTER SELECTION
            // FOR PLAYER 1 OR PLAYER 2
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
        // IF BOTH PLAYERS HAVE ALREADY BEEN SELECTED AND THE USER
        // CONTINUES TO MAKE SELECTIONS, THEN ADD THESE SELECTIONS
        // DYNAMICALLY TO THE UPCOMING OPPONENTS SECTION.
        else {
            $("#opponents").removeClass("hidden");
            $(charId).attr("disabled", true);
            var para = $("<p>");
            para.attr("id", $(this).attr("id"));
            var btn = $("<button>");
            btn.attr("id", $(this).attr("id"));
            btn.addClass("opponent-" + $(this).attr("id"));
            btn.attr("disabled", true);
            btn.html($(this).text());
            para.append(btn);
            $("#opponents").append(para);
            opponents.push(charName);

        }
    });

    // SETS HEALTH BARS AND ATTACK BARS BASED ON THE DATA ATTRIBUTES FOR EACH CHARACTER
    var setBars = function (player, charName) {
        if (player === "player1") {
            $("#player1").parent().find("#healthbar").width(parseInt($(charId).data("health")) / 2 + "%");
            $("#player1").parent().find("#attackbar").width(parseInt($(charId).data("attack")) / 2 + "%");
        }
        else {
            $("#player2").parent().find("#healthbar").width(parseInt($(charId).data("health")) / 2 + "%");
            $("#player2").parent().find("#attackbar").width(parseInt($(charId).data("attack")) / 2 + "%");
        }
    }

    /* RESET BUTTON CLICK AND RESET BOARD */
    $(".reset").click(function () {
        resetBoard();
    })

    var resetBoard = function () {
        playersSelected = false;
        player1Selected = false;
        player2Selected = false;
        $("#reset").addClass("hidden");
        $(".reset").attr("disabled", true);
        $("#fight").addClass("hidden");
        $(".fight").attr("disabled", true);
        $("#attack").addClass("hidden");
        $(".attack").attr("disabled", true);
        $(".confirm").attr("disabled", true);
        $("#confirm").removeClass("hidden");
        player1 = "";
        player2 = "";
        player2Name = "";
        opponents = [];
        charId = "";
        player1Id = "";
        player2Id = "";
        $(".char").attr("disabled", false);
        $("#talkToPlayer").text("CHOOSE YOUR PLAYER");
        $("#player1").css("background-image", "url(assets/images/playerbg.jpg)");
        $("#player2").css("background-image", "url(assets/images/playerbg.jpg)");
        $("#player1").parent().find("#healthbar").width("100%");
        $("#player1").parent().find("#attackbar").width("100%");
        $("#player2").parent().find("#healthbar").width("100%");
        $("#player2").parent().find("#attackbar").width("100%");
        setCharData();
    }


});

