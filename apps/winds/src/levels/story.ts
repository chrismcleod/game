import { sample } from 'lodash'
import pluralize from 'pluralize'

import { articlize } from '@warebots/utils-browser'

import { Game } from '../game/types'

const { ItemBits: B } = Game

export const s = {
  unknown: () =>
    sample([
      'What?',
      'Huh?',
      'Nothing happened.',
      "I don't understand.",
      'Try a different command.',
    ]) as string,
  alreadyHave: (item: Game.Item) => `You already have ${articlize(item.name)}`,
  attackedWith: (verb: string, mo: string, io: string) =>
    `You ${verb} the ${mo} with the ${io}.`,
  attackedWithHands: (verb: string, mo: string) =>
    `You ${verb} the ${mo} with your hands.`,
  dontSeeEither: () =>
    sample([
      "You don't see either of those things.",
      "You can't see any of that.",
      'Try that on things you can see.',
    ]) as string,
  dontSeeWord: (word: string) => `You don't see ${articlize(word)}.`,
  dontHaveEither: (mi: Game.Item, ii: Game.Item) =>
    `You don't have ${articlize(mi.name)} or ${articlize(ii.name)}`,
  dontHave: (item: Game.Item) => `You don't have ${articlize(item.name)}`,
  comboFailed: (mi: Game.Item, ii: Game.Item) =>
    sample([
      `You whack ${articlize(mi.name)} against ${
        ii.name
      } for awhile and tada! You're tired.`,
      `${articlize(mi.name)} and ${articlize(ii.name)} don't mix.`,
      `You idly fumble about with ${articlize(mi.name)} and ${articlize(
        ii.name
      )}, but give up after a bit when nothing happens.`,
    ]) as string,
  consumed: (ov: string, mo: string) => `You ${ov} ${mo}.`,
  cantConsume: (ov: string, mo: string) => `You can't ${ov} ${articlize(mo)}.`,
  cantDigItem: (item: Game.Item) =>
    `After pawing at the ${item.name} for a bit, you realize you're digging up nothing but your own grave.`,
  cantDigWord: (word: string) =>
    `It doesn't look like there is ${articlize(word)} to dig around here.`,
  cantDig: "You couldn't dig that up.",
  canDig: (item: Game.Item) => `After digging in the ${item.name} for a bit`,
  cantSee: (mo: string) => `You don't see ${mo}`,
  dontSeeAnymore: (word: string) => `You don't see anymore ${pluralize(word)}.`,
  dontSeeEitherWord: (mo: string, io: string) =>
    `You don't see either ${articlize(mo)} or ${articlize(io)}`,
  cantTake: (item: Game.Item) =>
    item.descs[B.UNTAKEABLE] || 'You cannot take that.',
  cantAttack: (verb: string) => `You can't ${verb} that.`,
  cantAttackThat: (verb: string, mo: string) =>
    `You can't ${verb} ${articlize(mo)}.`,
  cantAttackWithThat: (verb: string, mo: string, io: string) =>
    `You can't ${verb} ${articlize(mo)} with ${articlize(io)}.`,
  taken: 'Taken.',
  cantWalk: "You can't go that way.",
  i: {
    stumptrees: {
      name: 'trees',
      desc: 'Many old trees with deep wide roots clutch at the oozing mud like claws.',
      descs: {
        [B.OPEN_ON_EXAMINE]:
          'The claw-like trees cast eery shadows upon the the depthless bog.  You notice a hollow stump right off the path.',
        [B.CLOSED]:
          'Many old trees with deep wide roots clutch at the oozing mud like claws.',
        [B.CONTAINER]:
          'Many old trees with deep wide roots clutch at the oozing mud like claws.',
        [B.VISIBLE]: 'visible',
        [B.UNTAKEABLE]: `These are healthy trees.  Unlike a rotten tree, you aren't yet strong enough to rip healthy trees from the ground.`,
      },
      syn: ['forrest', 'jungle'],
      adj: [],
    },
    hollowstump: {
      name: 'stump',
      desc: 'Where a tree once grew, now there is only a hollow tree stump.  The tree must have rotted away and fallen into the stream.',
      descs: {
        [B.OPEN_ON_EXAMINE]:
          'You look inside the stump and see what looks like a dirty leather-bound book.',
        [B.CONTAINER]:
          'Where a tree once grew, now there is only a hollow tree stump.  The tree must have rotted away and fallen into the stream.',
        [B.CLOSED]:
          'Where a tree once grew, now there is only a hollow tree stump.  The tree must have rotted away and fallen into the stream.',
        [B.VISIBLE]: 'visible',
        [B.UNTAKEABLE]: `Although it's just a stump, its roots still have a firm grasp in the muck. You aren't quite strong enough to rip a tree stump from the ground.`,
      },
      syn: ['log', 'trunk', 'trees', 'forrest', 'jungle'],
      adj: ['hollow'],
    },
    spellbook: {
      name: 'book',
      desc: 'spellbook.',
      descs: {
        [B.CLOSED]: 'closed book.',
        [B.CONTAINER]: 'container book',
        [B.VISIBLE]: 'visible book',
      },
      syn: ['spellbook', 'spell book', 'book'],
      adj: ['', 'spell'],
    },
    coconut: {
      name: 'coconut',
      desc: "It's fibrous woody husk reminds you of a scratchy wool sweater.",
      descs: {
        [B.VISIBLE]: 'A coconut rests on the ground here.',
      },
      syn: [],
      adj: [],
    },
    flask: {
      name: 'flask',
      desc: 'Through the rust you see an eagle etched into its surface.',
      descs: {
        [B.VISIBLE]: 'An old rusty flask.',
        [B.CONTAINED]: 'an old rusty flask containing',
        [B.CONTAINER]: 'An old rusty flask lays in the sand.  It contains',
      },
      syn: [],
      adj: ['old', 'rusty'],
    },
    sand: {
      name: 'sand',
      desc: 'White sand is blindly hot in the afternoon sun.',
      descs: {
        [B.CLOSED]: 'Something half-buried at your feet glints in the sun.',
        [B.CONTAINER]: 'you make a small hole.  At the bottom is',
        [B.VISIBLE]: 'A small whole in the sand contains',
        [B.UNTAKEABLE]:
          'You bend down and grab a handful of sand.  It slips through your fingers...like sand.',
      },
      syn: ['ground', 'dirt'],
      adj: [],
    },
    seawater: {
      name: 'seawater',
      desc: 'A small amount of salty seawater.',
      descs: {
        [B.CONTAINED]: 'a small amount of salty seawater.',
        [B.UNTAKEABLE]: 'How would you hold onto seawater?',
      },
      syn: ['seawater', 'water'],
      adj: ['salty'],
    },
    rottentree: {
      name: 'tree',
      desc: 'A thick tree with a rotten trunk.',
      descs: {
        [B.CORPSE]: '',
        [B.VISIBLE]:
          'A tall tree growing near the bank of the stream has had its roots exposed and eroded. It seems to have a rotting trunk.',
        [B.DYING]:
          'The tree sways a bit but noting happens.  Then you hear a loud CRACK! Followed by several more CRACK! CRA-CRA-CRACRA CRAAAACK!  The tree snaps at its rotten trunk and falls across the stream, bridging the opposite shore.  The steam flows peacefully on underneath it.',
      },
      syn: ['trunk'],
      adj: ['rotten'],
    },
    pepperplant: {
      name: 'pepper plant',
      desc: 'Among the underbrush a pepper plant is growing.  Several red and orange peppers hang from its stems.',
      descs: {
        [B.CONTAINER]:
          'Among the underbrush a pepper plant is growing. Several peppers hang from its stems.',
        [B.UNTAKEABLE]: 'How would you hold onto a whole pepper plant?',
      },
      syn: ['plant'],
      adj: ['pepper'],
    },
    pepper: {
      name: 'pepper',
      desc: 'This deep red pepper looks tasty.',
      descs: {
        [B.CONSUMABLE]:
          'You crunch into the juicy red pepper. Its spicy flavor lights up your tounge and the heat spreads throughout your mouth.  How refreshing!',
      },
      syn: ['plant'],
      adj: ['spicy'],
    },
  },
  l0: {
    r0: {
      visit:
        "Your clothes are tattered, the frill of your white linen shirt torn away.  What used to be pants, are now cut-off in jagged edges at your knees.  You reach up to inspect a sharp pain in your forehead and when you look, your fingers drip dark red blood.You look down and are at least a bit relieved to see your shoes are still in tact.  You notice you're on a beach.",
      enter: "You're on a beach.",
      e: {
        nc: 'A dense tangle of trees, vines, and underbrush blocks the way north.',
        sc: 'Endless aquamarine ocean rolls gently toward you.',
        ec: "Gulls circle a towering cliff.  You don't think you could climb it without climbing gear.",
        wo: 'White sand gently curves in and out for miles to the west.',
      },
    },
    r1: {
      visit:
        'After walking several miles down the beach, you take a break in the shade of a small grove of palm trees and banana plants.',
      enter:
        "You're resting in the shade of a grove of trees and banana plants.",
      e: {
        no: 'There seems to be a path cut into the jungle to the north.',
        sc: 'Endless aquamarine ocean rolls gently toward you.',
        eo: 'To the east, gulls circle a distant cliff.',
        wc: 'Endless aquamarine ocean rolls gently toward you.',
      },
    },
    r2: {
      visit:
        "Cautiously you enter the jungle path.  A few minutes in and you're sweating in an intense humidity.  Bugs buzz into your ears and swarm your eyes. Cackling calls and insect chirps echo through the thick jungle growth. As you're walking everything goes abrubtly quiet.  Stopping to listen, you hear a tree snap somewhere off to the west.  The noise grows louder until it sounds like something huge is lumbering through the underbrush. You dive behind a boulder until the sound of snapping trees fades into the distance.  After a few minutes the jungle noises return at full volume.  Standing up you look around.  There is a wide stream flowing swiftly south westward.",
      enter:
        'Insects swarm around you and their buzzing joins the sound of echoing calls from the depths of the jungle.  The path ends at a wide stream flowing swiftly south westward.',
      e: {
        nc: 'The stream is flowing too swiftly to cross.',
        so: 'A jungle path winds away to the south.',
        ec: 'A dense tangle of trees, vines, and underbrush blocks the way east.',
        wo: 'A half-rotten tree bridges the eastern and western shore of a swiftly-flowing stream.',
        wc: 'The stream is flowing too swiftly to cross.',
      },
    },
    r3: {
      visit:
        'You inch cautiously across the fallen log.  The swift current of the stream flows beneath your feet.  You arrive safely at the other side and continue north.  Deeper into the jungle the air grows cooler and new smells and sounds arise from the depths.  The stench of rot pierces your nose.  Frogs croak all around you.  A bubbling bog of peat and mud creeps back into the shadows from which cackles and cries strike out like knives in your ears.',
      enter:
        "You're standing in a jungle.  There is an incessant croak of frogs and cackles from the shadows. Trees tower above you and the shade of the canopy cools the air.",
      e: {
        no: 'You hear a strange popping sound to the north.',
        sc: 'Thick jungle blocks the path south.',
        eo: 'Beneath the buzzing of inscts, you hear flowing water to the east.',
        wc: "An oozing peat bog stretches into the shadows to the west.  You'd get stuck if you went that way.",
      },
    },
    r4: {
      visit:
        'You make your way north pushing through scratching underbrush and slapping at huge insects.  The strange popping sound grows louder until finally you emerge into a small clearing.  Light shines down in dusty columns scatterring the light like fireflies.  Where the light falls in a pool near your feet, you see what look like hundreds of bugs jumping up and down in place at the base of a gnarled tree trunk.  The branches of this tree gently reach toward the sky then slowly relax again.  You take a few deep breaths and stretch your arms up and exhale slowly in sync with the breathing tree.',
      enter:
        "Deep in the jungle, you stop to rest at the trunk of a massive tree.  Light cascades down in dusty columns.  The tree's branches straighten and stretch toward the sunlight above then relax again.  You take a few deep breaths of your own.",
      e: {
        no: 'The air seems to grow more crisp and there is light far above to the north.',
        so: 'A foul smell and strange gurgling sound emanate from the path south.',
        ec: 'Thick jungle blocks the way east.',
        wc: 'A bubbling oozing bog blocks any movement west.',
      },
    },
    r5: {
      visit:
        "You trudge north breathing heavily.  The path has steepened and you soon realize you're climbing a steep incline. After a few hours of winding your way up this mountain path, you step out from a line of trees.  You inhale sharply.  The view is spectacular.  A blue and golden sky sparkles on the gentle rippling of endless ocean.  You make your way to the edge of the cliff and carefully peer over.  There is ocean as far as you can see on all sides.  You notice there are stairs carved into the rock here that wind down to a dock far below.  Something odd shimmers in the water down there.",
      enter:
        'You are standing on a cliff overlooking endless ocean as far as you can see.',
      e: {
        nc: 'The cliff is too treachourous to go north.',
        so: 'A line of jungle trees with a narrow path lies to the south.',
        do: 'Stairs are carved into the rock and wind their way down the cliff to a pier far below.',
        eo: 'The ridgeline continues narrowly to the east.',
        wo: 'The cliff widens and flattens downward to the west.',
      },
    },
    r6: {
      visit:
        "After resting a bit and enjoying the cliff-top view, you continue west.  The ridge path becomes quite narrow and stones tumble down both sides as you make your way through.  You come upon a deep ravine but, to your surprise, there is an aging rope bridge here.  After studying a bit, you decide it's safe and carefully make your way across as a few planks here and there give way and fall into the ocean below. On the other side you come to a fork in the road.  There is a sign post here pointing north and west.  The writing etched into the rotting wood is unlike any language you have ever seen.",
      enter:
        'You cross an aginig rope bridge and come upon a fork in the road.  There is a sign post here but the languaged etched into the rotting wood is indecipherable.',
      e: {
        no: 'You can see what looks like a strange glow to the north. Even more distant, you see a shack at the peak of a cliff.',
        sc: 'The cliff drops steeply to the south.  You cannot climb down.',
        eo: 'Down a short well-travled path to the east, you see a field of golden wheat.',
        wo: 'To the west, an aging rope bridge crosses a deep ravine.',
      },
    },
    r7: {
      visit:
        'You casualy make your way toward the wheat field.  The gentle breeze, the distant sounds of roaring ocean waves and gulls, the cool sea air all lull you into a peaceful state of mind.  This is a wonderful place.  You think to yourself someone had to have made that rope bridge.  You wonder who may have lived here? What happened to them? As you arrive at the wheat field you see no obvious way around it so you decide to walk straight through. You stop after a bit to enjoy the colors and sounds that surround you.  You inhale deeply, close your eyes, and face the sun.  The warmth on your face is nice.  You blink your eyes open.',
      enter:
        'You are standing in the middle of a field of once cultivated wheat.  The wind ripples through the wheat and entrances you.',
      e: {
        nc: 'You make your way through the field north a bit, but come to a steep cliff.  You can go no further so after admiring the view for a bit, you go back south.',
        sc: 'You make your way through the field south a bit, but come to a steep cliff.  You can go no further so after admiring the view for a bit, you go back north.',
        eo: 'You can see a crossroads to the east.',
        wc: 'The cottage door the west is locked.',
        wo: 'The door to a cottage sits open to the west.',
      },
    },
    r8: {
      visit:
        'You face a crumbling cabin.  There is a huge hole in the roof and giant scratch marks run horizontally across the whole wooden structure.  Rusting iron bars guard the only window and red paint peels off a thick open door.  You nudge the door open a bit further and step inside.  A musty smell overtakes you and you sneeze.',
      enter:
        'Crossing through the wheat field, you arrive at the door of a dillapidated cottage.  You step inside and your eyes adjust to the darker room.',
      e: {
        no: 'The cabin seems to be three spaces in one room.  To the the north is an open kitchen.',
        sc: 'There are no doors to the south.',
        eo: 'A red door opens into a bright field of wheat to the east.',
        wc: 'There are no doors to the west.',
      },
    },
    r9: {
      visit:
        'You take a few steps into the kitchen and bugs scatter out from underneath old food cans, overturned bowls, and piles of rotting food.  A few strips of yellow flowery wallpaper still cling to the walls.',
      enter:
        'A few steps into the kitchen and bugs flee from your presence.  Old yellow wallpaper sags from the walls.',
      e: {
        nc: 'A barred window over a sink blocks any exit north.',
        so: 'The main cabin room is to the south.',
        ec: 'To the east there is only a mostly empty closet with old food cans littering the floor.',
        wc: 'A wooden table and chairs lies half burnt in a pile to the west.  There are no exits that way.',
      },
    },
    r10: {
      visit:
        'You hike up the grassy path for a bit and stop when you arrive at a strange sight.  A bush grows here and bears fruit but these berries are on fire.  You can feel the intense heat as you try to pick them and jerk your hand back.',
      enter: 'Hiking up a grassy path, you stop at bush with flaming berries.',
      e: {
        no: 'You can see a rusted tin shack at the peak of the cliff to the north.',
        so: 'A gentle slope south ends at a crossroads.',
        ec: 'The cliff drops steeply to the ocean below.  You cannot climb down.',
        wc: 'A deep ravine blocks your way west, but you can make out a cottage far below on the other side of the ravine.',
      },
    },
    r11: {
      visit:
        'Continuing to hike up the grassy path, you arrive at the rusty shack.  It looks like some kind of old barn as it only has three walls and a roof.  Though at this point, the roof has several holes it.  Inside the small shack is a rusty tractor with weeds growing through it and vines creeping there way over it.',
      enter:
        'Continuing to hike north, you arrive at a rusty old barn shack.  Inside, an tractor is being reclaimed by the weeds.',
      e: {
        nc: 'You stand at the peak of the cliff.  Ocean surrounds an enormous island. All around is thick jungle.  The cliff drops steeply to the ocean below.  You cannot climb down.',
        so: 'To the south you see a bush with flaming berries.',
        ec: 'A small bay far below opens onto open ocean to the east.  You cannot climb down this steep cliff.',
        wc: 'The cliff drops sharply to open ocean to the west.  You cannot climb down.',
      },
    },
    r12: {
      visit:
        'After resting a bit and enjoying the cliff-top view, you continue east.  The wide open field and gentle downward slope are a nice relief after all the cliff-top hiking.  Soon you find yourself in a valley.  An expansive waterfall fall cascades down a cliff-face pooling below into a small lagoon and continuing south westward in a swift stream.',
      enter:
        'You enjoy a leisurely stroll down into an emerald valley.  A stream flows down from the eastern mountain.',
      e: {
        nc: 'To the north, the grassy valley continues to nothing but a beach and open ocean beyond.',
        sc: "To the south, the grassy valley continues to a thick line of jungle trees.  You don't see a way in.",
        eo: 'A wooden bridge spans the stream and stairs are carved into a mountain and lead upwards to the east.',
        wo: 'The valley climbs gently upward to the west.',
      },
    },
    r13: {
      visit:
        'You cross the bridge and hike up what seems like an endless staircase carved into the mountain.  Step by step you make your way upwards.  A few lizards flee into cracks and crevices in the stone.  You soon lose count of the stairs and take a break.  Sitting down you look back at the beautiful green valley below.  You imagine building a cabin there.  After some more day dreaming, you dust yourself off and continue the upward climb.  You are sweating by the time you reach the top.  At the final stair you take a look around.  To the west and east a shallow reservoir flows gently over the cliff.  A rocky path covered in weeds and shored up on both sides with stones crosses through the middle of this reservoir and ends at a huge stone castle. You make your way along the path mareling at the architecture of it all.  You pass through orderly rows of what have once been topiaries and pass by a fountain depicting an intricate stone glove holding a globe.  Finally you arrive at a huge wooden door barred by metal shaped to look like intricate clockwork designs.  The bottom corner of the door has broken away and you squeeze through.  Inside, you stand in a shadowy foyer.  light trickles down from holes in the ceiling high above.',
      enter: '',
      e: {
        nc: 'A huge archyway to the north is blocked by fallen debris.',
        so: 'A door opens into a small broom closet off to the south.',
        eo: 'At the end of a long hallway, you can see a garden on the other side if enormous glass doors.',
        wo: 'To the west, a small hole in the huge doors is just large enough to squeeze through.',
        uo: 'A set of stairs, quite wide at the bottom, lead upward to a narrow landing.',
      },
    },
    r14: {
      visit:
        'You enter the closet and gaze at shelves full of pots, papers, boxes, and other junk.  The shelves seem to stretch too far back and fade into darkness.  Something catches your eye and you jerk your head to the far corner just in time to see what looks like a purple tentacle slither back into the shadows.',
      enter:
        'You enter the closet and gaze at shelves full of pots, papers, boxes, and other junk.  The shelves seem to stretch too far back and fade into darkness.  Something catches your eye and you jerk your head to the far corner just in time to see what looks like a purple tentacle slither back into the shadows.',
      e: {
        no: 'To the north is an open foyer.',
        sc: 'There is too much junk to delve deeper into this possibly endless closet.',
        ec: 'The closet is narrow, there is only a wall there.',
        wc: 'The closet is narrow, there is only a wall there.',
      },
    },
    r15: {
      visit:
        "You climb yet another staircase, and the stairs creak and crack with each step. Upon reaching the landing, you see three doors.  You try the first one but the door knob breaks off in your hand.  You peer through the hole and see the door is barricaded by piles of furniture.You try the second door and almost fall to your death!  The room beyond it has rotted away and the second story door opens onto nothing but outside air.  You can see a barren grey lawn below.  You try the third door and ... it's exactly what you hoped for.  It's just a normal door and opens into a bedroom.  Natural light pours in from three large windows illuminating dust motes as they drift aimlessly in the subtle currents of air.  Ornate curtains and carvings gild the windows.  There are a few rotting chairs facing a fireplace.",
      enter:
        'You climb yet another staircase, and the stairs creak and crack with each step.  You find your way into a well-lit bedroom with a fireplace and some ornate carvings gilding the three large windows.',
      e: {
        nc: 'The windows to the north wont budge.  They seem to be painted or nailed shut.',
        sc: "You go back onto the landing and try push open the blocked door.  It doesn't budge so you return to the bedroom.",
        ec: 'A huge canopy bed sits against the wall to the east.  There is nowhere to go that way.',
        wc: 'A cozy fireplace sits in the wall to the west.  You cannot go any further that way.',
        do: 'Outside the bedroom, a set of stairs lead down to the foyer below.',
      },
    },
    r16: {
      visit:
        'You walk down the long hallway.  Every 20 feet, large windows stretch from the floor to the ceiling.  Between them, short tables and old chairs sit beneath tapestries which hang from the high ceiling. As you gaze all around, you notice shreds of a long purple carpet have faded and decayed. A few chandliers still cling precariously to the ceiling but you walk along the wall since one of them has crashed to the floor.  After you crunch across the broken glass you begin to notice the paintings along the wall.  The colors seem to become more grey and faded the closer you get to the garden ahead.  One seems to depict rays of the sun shining down on a kingdom.  Another, some sort of abstract boat-like machine.  Yet another depicts a bountiful garden.  Finally you reach the glass doors and push them open.  You step out onto an enormous stone patio overlooking a barren patch of land.  You look down and gasp.  The color seems to have drained from everything.  The ground is grey, the sky is grey, the dead husks of plants, trees, even you.  All grey.',
      enter:
        'After making your way down the long hallway, you come out into a wasteland that was once a garden.  Everything here including you has turned to shades of lifeless grey.',
      e: {
        nc: 'A tangle of vines weaves in and out of a rusty iron fence and blocks the path north.',
        sc: 'A tangle of vines weaves in and out of a rusty iron fence and blocks the path south.',
        eo: 'Two large glass doors sit open to the east.',
        wo: 'A garden path leads underneath a swarming beehive to the west.',
      },
    },
    r17: {
      visit:
        "You continue east and come to a toolshed.  There is a rusty pad lock but it snaps off in your hand.  You step inside and sneeze as a moldy odor overtakes you.  The walls are lined with some familiar tools but also some gadgets you have never seen before.  A few posters are pinned to the wall depicting some kind of science you don't understand.",
      enter:
        "You continue east and come to a toolshed, the door is ajar and you step inside. The walls are lined with some familiar tools but also some gadgets you have never seen before.  A few posters are pinned to the wall depicting some kind of science you don't understand.",
      e: {
        nc: "You're inside a small shed.  There is only a wall to the north.",
        sc: "You're inside a small shed.  There is only a wall to the south.",
        ec: "You're inside a small shed.  There is only a wall to the east.",
        wo: 'The door is ajar to the west.',
      },
    },
    r18: {
      visit:
        "You make your way down the stone steps.  The sounds of waves crashing against the rocks grows louder with each step.  Soon you can taste the salt in the air and smell the acrid sea life growing on the rocks.  You reach the bottom and venture cautiously out onto the pier here. Peering into the water, you aren't quite sure what you're seeing but it soon dawns on you.",
      enter:
        'You make your way down the stone steps.  The sounds of waves crashing against the rocks grows louder with each step. You reach the bottom and venture cautiously out onto the pier. ',
      e: {
        nc: 'Endless ocean stretches to the north.',
        sc: 'A sheer cliff wall blocks any path south.',
        ec: 'A small inlet blocks any path east.',
        wc: 'A small inlet blocks any path west.',
        uo: 'A set of stairs carved into the rock lead upwards.',
      },
    },
  },
}
