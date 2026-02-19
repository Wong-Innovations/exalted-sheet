<template>
  <div style="display: flex">
    <div style="width: 31%">
      <div style="text-align: center">Grappling (Clinch Attack)</div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"
          >If clinch is successful victim is Inactive, attacker can choose
          to:</span
        >
      </div>
      <div style="height: 0.1in"></div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"> Break Hold:</span>
        Throw opponent Strength yards away -> knockback check. Or throw to
        ground -> prone. Or release opponent.
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"> Crush:</span>
        Strenth + additional successes from attack. Piercing bashing.
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"> Hold:</span>
        Maintain the clinch.
      </div>
      <div style="height: 0.1in"></div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          On additional actions:</span
        >
        Opposed Strength or Dexterity + Martial Arts to maintain clinch.
      </div>
    </div>
    <div style="width: 3%"></div>
    <div style="width: 31%">
      <div style="text-align: center">Effects</div>
      <div style="font-size: small">
        <span style="font-size: small; font-weight: bold">Bleeding:</span>
        Stamina + Resistance difficulty 2 to stop.
      </div>
      <div style="font-size: small">
        <span style="font-size: small; font-weight: bold">Knock back:</span>
        1 yard per 3 raw damage, will be prone.
      </div>
      <div style="font-size: small">
        <span style="font-size: small; font-weight: bold">Knockdown:</span>
        If raw damage > Stamina + Resistance, then Strength or Dexterity +
        Athletics or Resistance.
        <span style="font-size: small; font-weight: bold">Difficulty:</span>
        2, will be prone.
      </div>
      <div style="font-size: small">
        <span style="font-size: small; font-weight: bold">Stunned:</span>
        If damage > Stamina, then Strength + Resistance.
        <span style="font-size: small; font-weight: bold">Difficulty:</span>
        damange - stamina.
      </div>
    </div>
    <div style="width: 3%"></div>
    <div style="width: 31%">
      <div style="text-align: center">Special Attacks</div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"
          >Coup de Grace (-1e):</span
        >
        Maim instead of killing.
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Disarming (-2e close or -4e range):</span
        >
        Wits + Ability to hold on to weapon.
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Fierce Blows (-1e):</span
        >
        +2 Leathal or Aggrivated, or +3 Bashing to target.
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Pulling Blows (-1e):</span
        >
        Deal bashing damage instead of leathal or aggrivated.
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Showing Off (-1e to -4e):</span
        >
        Example slash a 'Z' across opponent's chest.
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Sweeping (-1e):</span
        >
        Target must test for knockdown.
      </div>
    </div>
  </div>
  <div style="display: flex">
    <div style="width: 42%">
      <div style="text-align: center">Action Options (Speed/DV modifier)</div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"
          >Attack(weapon/-2):</span
        >
        Attack a target
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Coordinated Attack(5/-2):</span
        >
        Charisma + Socialize, diff: number of participants / 2
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"> Dash(3/-3):</span>
        Sprint 10 * (Dexterity + 6 - Armor mobility) meters per long tick
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Flurry(longest action/sum of defense penalties):</span
        >
        Multiple actions
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"> Guard(3/none):</span>
        Doing nothing, may be aborted
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Inactive(3/special):</span
        >
        Social invulnerable
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Miscellaneous Action(5/-1 to -3):</span
        >
        Do something else
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold">
          Monologue/Study(3/-2):</span
        >
        +1D per long tick, may be aborted to attack
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"> Move(0/none):</span>
        Move 10 * (Dexterity - Armor mobility) meters per long tick
      </div>
    </div>
    <div style="width: 3%"></div>
    <div style="width: 55%">
      <div style="text-align: center">Additional</div>
      <div style="font-size: small">
        <span style="font-size: small; font-weight: bold"
          >Attack supporting/against an Intimacy:</span
        >
        &plusmn;1 to DV
      </div>
      <div style="font-size: small">
        <span style="font-size: small; font-weight: bold"
          >Attack according to/opposed to dominating Virtue(rate 3+):</span
        >
        &plusmn;2 to DV
      </div>
      <div style="font-size: small">
        <span style="font-size: small; font-weight: bold"
          >Attack supporting/against an Intimacy:</span
        >
        &plusmn;1 to DV
      </div>
      <div style="font-size: small">
        <span style="font-size: small; font-weight: bold">Appearance:</span>
        (Defender's App - Attacker's App) to DV (max &plusmn;3)
      </div>
      <div style="height: 0.1in"></div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"
          >If the attack violates Motivation:</span
        >
        Must refuse to consent
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"
          >Natural persuasion:</span
        >
        Can only spend 2wp per scene, will become jaded and suspicious (attack
        automatically fails). A stunt and new attack approach is needed for
        further attacks
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"
          >Unnatural persuasion:</span
        >
        Exalted gain 1 point of Limit when resisting the attack
      </div>
      <div style="height: 0.1in"></div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"
          >Consent to the attack:</span
        >
        Performing the behavior described in the initial attack
      </div>
      <div style="font-size: x-small">
        <span style="font-size: small; font-weight: bold"
          >Refuse to consent:</span
        >
        Reflexively pay 1wp to resist
      </div>
    </div>
  </div>
</template>
