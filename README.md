I used React Hooks with function components to handle filtering, sorting, and aggregation instead of writing component classes.

For filtering, I used react's useState and useEffect hooks.
Say under the filter "type" we have "lipstick", "lip gloss", "liquid lipstick" as categories. When users click on "lipstick", the state of the corresponding type will be changed, and the color of the "lipstick" tag will change from blue to black to indicate the current chosen category is lipstick. Then I use react's useEffect Hooks to handle the effect of selecting the corresponding category: only show the items from the corresponding category on the page.

In addition, I also use useEffect hook to calculate the total price in my aggregator section. When changes occur in shopping cart, this hook will calculate and set state to be the new total price.

