 // Spread operator works with objects too

    var morning = {
      breakfast: "oatmeal",
      lunch: "peanut butter and jelly"
    }

    var dinner = "mac and cheese"

    var backpackingMeals = {
      ...morning,
      dinner
    }

    console.log(backpackingMeals)

