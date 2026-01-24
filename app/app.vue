<template>
  <div class="container">
    <div class="page">
      <img :src="fullBar" style="width: 8.5in" alt="bar" />
      <table>
        <tbody>
          <tr>
            <td>
              <img :src="logo" style="height: 1.15in" alt="exalted-2e-logo" />
            </td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td><p>Name:</p></td>
                    <td>
                      <input
                        type="text"
                        class="text-input"
                        style="width: 2.5in"
                      />
                    </td>
                    <td style="padding-left: 0.15in">
                      <p>Exalt:</p>
                    </td>
                    <td>
                      <select
                        class="text-input"
                        v-model="exaltTypeRef"
                        style="width: 1.5in"
                      >
                        <option
                          v-for="value in Object.keys(exaltData)"
                          :value="value"
                        >
                          {{ capitalizeFirstLetter(value) }}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr style="line-height: 0.8">
                    <td><p>Player:</p></td>
                    <td>
                      <input
                        type="text"
                        class="text-input"
                        style="width: 2.5in"
                      />
                    </td>
                    <td style="padding-left: 0.15in">
                      <p>Caste:</p>
                    </td>
                    <td>
                      <select
                        class="text-input"
                        v-model="casteRef"
                        style="width: 1.5in"
                      >
                        <option></option>
                        <option
                          v-if="
                            Object.keys(exaltData[exaltTypeRef]).includes(
                              'attributes'
                            )
                          "
                          v-for="(val, caste, index) in exaltData[exaltTypeRef]
                            .attributes"
                          :key="caste"
                          :value="caste"
                        >
                          {{ capitalizeFirstLetter(caste) }}
                        </option>
                        <option
                          v-for="(val, caste, index) in exaltData[exaltTypeRef]
                            .abilities"
                          v-if="
                            !Object.keys(exaltData[exaltTypeRef]).includes(
                              'attributes'
                            )
                          "
                          :key="caste"
                          :value="caste"
                        >
                          {{ capitalizeFirstLetter(caste) }}
                        </option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div>Attributes</div>
      </div>
      <table style="width: 100%; margin-block: 0.1in">
        <tbody>
          <tr>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'strength'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'strength'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Strength_"
                  : "Strength____"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :initialValue="1"
                :onUpdate="(n) => (strengthRef = n)"
                source="strength"
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'charisma'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'charisma'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Charisma___"
                  : "Charisma_______"
              }}
              <FiveDotRadio
                class="attribute-dots"
                initialValue="1"
                :onUpdate="(n) => (charismaRef = n)"
                source="charisma"
                :checkbox="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'perception'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'perception'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Perception"
                  : "Perception_____"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :initialValue="1"
                :onUpdate="(n) => (perceptionRef = n)"
                source="perception"
                :checkbox="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'dexterity'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'dexterity'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Dexterity"
                  : "Dexterity___"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :initialValue="1"
                :onUpdate="(n) => (dexterityRef = n)"
                source="dexterity"
                :checkbox="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'manipulation'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'manipulation'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Manipulation"
                  : "Manipulation___"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :initialValue="1"
                :onUpdate="(n) => (manipulationRef = n)"
                source="manipulation"
                :checkbox="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'intelligence'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'intelligence'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Intelligence"
                  : "Intelligence___"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :initialValue="1"
                :onUpdate="(n) => (intelligenceRef = n)"
                source="intelligence"
                :checkbox="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'stamina'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'stamina'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Stamina_"
                  : "Stamina____"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :initialValue="1"
                :onUpdate="(n) => (staminaRef = n)"
                source="stamina"
                :checkbox="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'appearance'
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes(
                    'appearance'
                  )
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Appearance_"
                  : "Appearance_____"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :initialValue="1"
                :onUpdate="(n) => (appearanceRef = n)"
                source="appearance"
                :checkbox="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
            <td>
              <input
                type="checkbox"
                style="height: 16px; width: 16px"
                v-if="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes('wits')
                "
                :disabled="
                  exaltData[exaltTypeRef].attributes[casteRef] &&
                  exaltData[exaltTypeRef].attributes[casteRef].includes('wits')
                "
              />
              {{
                Object.keys(exaltData[exaltTypeRef]).includes("attributes")
                  ? "Wits_______"
                  : "Wits___________"
              }}
              <FiveDotRadio
                class="attribute-dots"
                :initialValue="1"
                :onUpdate="(n) => (witsRef = n)"
                source="wits"
                :checkbox="
                  Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div>Abilities</div>
      </div>
      <table
        style="width: 100%; margin-block: 0.1in; table-layout: fixed"
        id="ability-table"
      >
        <tbody>
          <tr style="text-align: center">
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[0]
                )
              }}
            </td>
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[1]
                )
              }}
            </td>
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[2]
                )
              }}
            </td>
          </tr>
          <tr
            v-for="(val, index) in exaltData[exaltTypeRef].abilities[
              Object.keys(exaltData[exaltTypeRef].abilities)[0]
            ]"
          >
            <td
              :style="
                Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                  ? 'padding-inline: .2in'
                  : ''
              "
            >
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[0]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[0]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[0]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[0]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[0]
                      ][index]
                    ] = n)
                "
              />
            </td>
            <td
              :style="
                Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                  ? 'padding-inline: .2in'
                  : ''
              "
            >
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[1]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[1]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[1]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[1]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[1]
                      ][index]
                    ] = n)
                "
              />
            </td>
            <td
              :style="
                Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                  ? 'padding-inline: .2in'
                  : ''
              "
            >
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[2]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[2]
                      ][index]
                    ] = n)
                "
                v-if="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[2]
                  ][index] != ''
                "
              />
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[2]
                    ][index]
                  ) + '__'
                "
                :source="'other' + (index - 5)"
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                v-if="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[2]
                  ][index] == ''
                "
              />
            </td>
          </tr>
          <tr
            style="text-align: center"
            v-if="Object.keys(exaltData[exaltTypeRef].abilities).length > 3"
          >
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[3]
                )
              }}
            </td>
            <td>
              {{
                capitalizeFirstLetter(
                  Object.keys(exaltData[exaltTypeRef].abilities)[4]
                )
              }}
            </td>
            <td>Other</td>
          </tr>
          <tr
            v-if="Object.keys(exaltData[exaltTypeRef].abilities).length > 3"
            v-for="(val, index) in exaltData[exaltTypeRef].abilities[
              Object.keys(exaltData[exaltTypeRef].abilities)[3]
            ]"
          >
            <td>
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[3]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[3]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[3]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[3]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[3]
                      ][index]
                    ] = n)
                "
              />
            </td>
            <td>
              <AbilityScore
                :label="
                  capitalizeFirstLetter(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[4]
                    ][index]
                  ) + '__'
                "
                :source="
                  exaltData[exaltTypeRef].abilities[
                    Object.keys(exaltData[exaltTypeRef].abilities)[4]
                  ][index]
                "
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
                :checked="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[4]
                    ][index]
                  )
                "
                :disabled="
                  exaltData[exaltTypeRef].abilities[casteRef] &&
                  exaltData[exaltTypeRef].abilities[casteRef].includes(
                    exaltData[exaltTypeRef].abilities[
                      Object.keys(exaltData[exaltTypeRef].abilities)[4]
                    ][index]
                  )
                "
                :onUpdate="
                  (n) =>
                    (abilityScoreRefs[
                      exaltData[exaltTypeRef].abilities[
                        Object.keys(exaltData[exaltTypeRef].abilities)[4]
                      ][index]
                    ] = n)
                "
              />
            </td>
            <td>
              <AbilityScore
                label="__"
                :source="'other' + index"
                :checkbox="
                  !Object.keys(exaltData[exaltTypeRef]).includes('attributes')
                "
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div>Essence</div>
      </div>
      <div style="display: flex">
        <div style="flex: 1">
          <div style="text-align: center">Anima Effects</div>
          <textarea
            style="min-height: 1.75in; width: 100%; resize: none"
          ></textarea>
        </div>
        <div style="flex: 1">
          <div
            style="width: fit-content; margin-inline: auto; margin-block: 0.1in"
          >
            <FiveDotRadio
              :initialValue="1"
              :onUpdate="(n) => (essenceRef = n)"
              source="essence"
              v-if="exaltTypeRef != 'heroic-mortal'"
            />
            <ThreeDotEssence
              :initialValue="1"
              :onUpdate="(n) => (essenceRef = n)"
              source="essence"
              v-if="exaltTypeRef == 'heroic-mortal'"
            />
          </div>
          <div style="margin-top: 0.15in; margin-left: 0.25in">
            Personal:&nbsp;&nbsp;&nbsp;
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
            <span style="font-size: x-large">/</span>
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
          </div>
          <div style="margin-top: 0.1in; margin-left: 0.25in">
            Peripheral:
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
            <span style="font-size: x-large">/</span>
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
          </div>
          <div style="margin-top: 0.15in; margin-left: 0.25in">
            Commited:
            <input
              type="text"
              class="text-input"
              style="position: relative; width: 0.35in; font-size: large"
            />
          </div>
        </div>
        <div style="flex: 1">
          <div style="text-align: center; font-size: large">
            Anima Banner Levels
          </div>
          <div style="font-size: small">1-3 Motes: Weak caste mark</div>
          <div style="margin-left: 0.2in; font-size: x-small">
            Perception + Awareness to notice
          </div>
          <div style="font-size: small">4-7 Motes: Strong caste mark</div>
          <div style="margin-left: 0.2in; font-size: x-small">
            Steath at -2e difficulty
          </div>
          <div style="font-size: small">8-10 Motes: Mild aura</div>
          <div style="margin-left: 0.2in; font-size: x-small">
            Stealth impossible
          </div>
          <div style="font-size: small">11-15 Motes: Bonfire aura</div>
          <div style="margin-left: 0.2in; font-size: x-small">
            Anima power auto-activation
          </div>
          <div style="font-size: small">16+ Motes: Iconic aura</div>
          <div style="margin-left: 0.2in; font-size: x-small">
            Fades when no peripheral essence is used
          </div>
        </div>
      </div>
      <img :src="fullBar" style="width: 8.5in" alt="bar" />
      <div style="display: flex; margin-bottom: 0.2in">
        <div style="flex: 4">
          <div style="text-align: center">Health Levels</div>
          <table>
            <tbody>
              <tr>
                <td valign="top">-0i Bruised</td>
                <td>
                  <HealthLevelRow
                    :levels="exaltData[exaltTypeRef].health.zero"
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">-1i Hurt</td>
                <td>
                  <HealthLevelRow
                    :levels="exaltData[exaltTypeRef].health.one"
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">-2i Wounded</td>
                <td>
                  <HealthLevelRow
                    :levels="exaltData[exaltTypeRef].health.two"
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">-4i Crippled</td>
                <td>
                  <HealthLevelRow
                    :levels="exaltData[exaltTypeRef].health.four"
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">Wounded</td>
                <td>
                  <HealthLevelRow
                    :levels="exaltData[exaltTypeRef].health.incapacitated"
                  />
                </td>
              </tr>
              <tr>
                <td valign="top">Dying</td>
                <td>
                  <HealthLevelRow
                    :levels="exaltData[exaltTypeRef].health.dying"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div style="font-size: small">
            Healing Times:<span style="font-size: x-small; margin-left: 0.2in"
              >Bashing 3hrs / level
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Lethal and
              Aggravated:</span
            >
          </div>
          <div style="font-size: x-small; display: flex">
            <div>
              Dying: Losing one dying level per 5 ticks, can be saved with a
              Wits + Medicine, diff: 5 + (number of dying levels lost)
            </div>
            <table
              style="
                font-size: x-small;
                border-collapse: collapse;
                width: 3.5in;
              "
              id="health-level-time-table"
            >
              <tbody>
                <tr>
                  <td style="border: 1px solid black">-0</td>
                  <td style="border: 1px solid black">-1</td>
                  <td style="border: 1px solid black">-2</td>
                  <td style="border: 1px solid black">-4, incap</td>
                </tr>
                <tr>
                  <td style="border: 1px solid black">6 hrs</td>
                  <td style="border: 1px solid black">2 days</td>
                  <td style="border: 1px solid black">4 days</td>
                  <td style="border: 1px solid black">1 week</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="flex: 5">
          <div style="text-align: center">Specialties</div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty1" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty2" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty3" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty4" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty5" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty6" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty7" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty8" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty9" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty10" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty11" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty12" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty13" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty14" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty15" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty16" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty17" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty18" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty19" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty20" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
          <div style="display: flex; justify-content: end">
            <ThreeDotRadio source="specialty21" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
            <ThreeDotRadio source="specialty22" style="margin-top: 4px" />
            <input type="text" class="text-input" style="width: 1.5in" />
          </div>
        </div>
      </div>
      <img :src="fullBar" style="width: 8.5in" alt="bar" />
    </div>

    <div style="height: 20px"></div>

    <div class="page">
      <img :src="fullBar" style="width: 8.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1.15in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="text-align: center">Social Traits</div>
          <table style="width: 100%; position: relative; top: -0.1in">
            <tbody>
              <tr>
                <td
                  style="
                    line-height: 0.7;
                    padding-left: 0.65in;
                    padding-block: 0;
                  "
                >
                  Dodge MDV:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="dodgeMdvComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Join Combat:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-size: x-small;
                    padding-left: 0.65in;
                    padding-block: 0;
                  "
                >
                  (Wp + Integrity + Essence + spe.) / 2
                </td>
                <td style="font-size: x-small; padding-block: 0">
                  Wits + Awareness
                </td>
              </tr>
            </tbody>
          </table>
          <div style="display: flex">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Willpower:
            <WillpowerDots
              :initial-value="willpowerRef"
              :onUpdate="(n) => (willpowerRef = n)"
            />
          </div>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div style="padding-block: 0">Social Attacks</div>
      </div>
      <table
        style="
          border-collapse: collapse;
          width: 100%;
          font-size: small;
          margin-bottom: 0.1in;
        "
      >
        <thead>
          <tr>
            <th style="text-align: left">Ability</th>
            <th style="text-align: left">Speed</th>
            <th style="text-align: left">
              Accuracy <span style="font-weight: normal">(Cha/Man)</span>
            </th>
            <th style="text-align: left">
              PMDV <span style="font-weight: normal">(Cha/Man)</span>
            </th>
            <th style="text-align: left">Rate</th>
            <th style="text-align: left">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #ddd">
            <td style="border: 1px solid black">Investigation</td>
            <td style="border: 1px solid black; text-align: center">5</td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center">2</td>
            <td style="border: 1px solid black"></td>
          </tr>
          <tr>
            <td style="border: 1px solid black">Performance</td>
            <td style="border: 1px solid black; text-align: center">6</td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center">1</td>
            <td style="border: 1px solid black">Attacks a whole area</td>
          </tr>
          <tr style="background-color: #ddd">
            <td style="border: 1px solid black">Presence</td>
            <td style="border: 1px solid black; text-align: center">4</td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center"></td>
            <td style="border: 1px solid black; text-align: center">2</td>
            <td style="border: 1px solid black"></td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div style="padding-block: 0">In Debate</div>
      </div>
      <div style="display: flex">
        <div style="width: 42%">
          <div style="text-align: center">
            Action Options (Speed/DV modifier)
          </div>
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
            <span style="font-size: small; font-weight: bold">
              Dash(3/-3):</span
            >
            Sprint 10 * (Dexterity + 6 - Armor mobility) meters per long tick
          </div>
          <div style="font-size: x-small">
            <span style="font-size: small; font-weight: bold">
              Flurry(longest action/sum of defense penalties):</span
            >
            Multiple actions
          </div>
          <div style="font-size: x-small">
            <span style="font-size: small; font-weight: bold">
              Guard(3/none):</span
            >
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
            <span style="font-size: small; font-weight: bold">
              Move(0/none):</span
            >
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
            Can only spend 2wp per scene, will become jaded and suspicious
            (attack automatically fails). A stunt and new attack approach is
            needed for further attacks
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
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div style="padding-block: 0">Virtues</div>
      </div>
      <div style="display: flex">
        <table
          style="
            font-size: x-small;
            text-align: center;
            border-collapse: collapse;
          "
        >
          <tbody>
            <tr>
              <td>Compassion</td>
              <td>Temperance</td>
            </tr>
            <tr>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  :initialValue="1"
                  source="compassion"
                  :onUpdate="(n) => (compassionRef = n)"
                />
              </td>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  :initialValue="1"
                  source="temperance"
                  :onUpdate="(n) => (temperanceRef = n)"
                />
              </td>
            </tr>
            <tr>
              <td>Conviction</td>
              <td>Valor</td>
            </tr>
            <tr>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  :initialValue="1"
                  source="conviction"
                  :onUpdate="(n) => (convictionRef = n)"
                />
              </td>
              <td style="padding-inline: 0.1in">
                <VirtueDots
                  :initialValue="1"
                  source="valor"
                  :onUpdate="(n) => (valorRef = n)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-left: 0.1in">
          <div style="display: flex; font-size: small">
            Virtue Flaw:
            <select
              class="text-input"
              style="width: 2.9in; background-color: white; font-size: x-small"
            ></select>
            <div style="width: 2.95in; text-align: center">Limit points</div>
          </div>
          <div style="display: flex; font-size: small">
            Duration:
            <input
              type="text"
              class="text-input"
              style="width: 3.04in; font-size: x-small"
            />
            <div style="width: 2.95in; text-align: center"><LimitPoints /></div>
          </div>
          <div style="display: flex; font-size: small">
            Limit Break Condition:
            <input
              type="text"
              class="text-input"
              style="width: 5.1in; font-size: x-small"
            />
          </div>
          <div style="display: flex; font-size: small">
            Partial Control:
            <input
              type="text"
              class="text-input"
              style="width: 5.59in; font-size: x-small"
            />
          </div>
          <div style="display: flex; font-size: small">
            No Control:
            <input
              type="text"
              class="text-input"
              style="width: 5.84in; font-size: x-small"
            />
          </div>
        </div>
      </div>
      <div class="full-bar-with-text" style="margin-top: 0.1in">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div style="padding-block: 0">Intimacies</div>
      </div>
      <table
        style="
          width: 95%;
          border-collapse: collapse;
          margin-inline: auto;
          margin-top: 0.1in;
        "
      >
        <tbody>
          <tr>
            <td>
              <textarea
                style="width: 100%; height: 1.7in; resize: none"
              ></textarea>
            </td>
            <td>
              <textarea
                style="width: 100%; height: 1.7in; resize: none"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="full-bar-with-text" style="margin-top: 0.1in">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div style="padding-block: 0">Motivation</div>
      </div>
      <div style="width: 95%; margin-inline: auto; margin-block: 0.1in">
        <textarea style="width: 100%; height: 1.5in; resize: none"></textarea>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
      </div>
    </div>

    <div style="height: 20px"></div>

    <div class="page">
      <img :src="fullBar" style="width: 8.5in" alt="bar" />
      <div style="display: flex">
        <img :src="logo" style="height: 1.15in" alt="exalted-2e-logo" />
        <div style="width: 100%">
          <div style="text-align: center">Soak and Defense</div>
          <table style="width: 100%">
            <tbody>
              <tr>
                <td
                  style="
                    line-height: 0.7;
                    padding-left: 0.65in;
                    padding-block: 0;
                  "
                >
                  Bashing Soak:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="dodgeMdvComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Lethal Soak:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Aggravated Soak:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-size: x-small;
                    padding-left: 0.65in;
                    padding-block: 0;
                  "
                >
                  Stamina + Armor (B)
                </td>
                <td style="font-size: x-small; padding-block: 0">
                  Stamina + Armor (L)
                </td>
                <td style="font-size: x-small; padding-block: 0">Armor (L)</td>
              </tr>
            </tbody>
          </table>
          <table style="width: 100%">
            <tbody>
              <tr>
                <td
                  style="
                    line-height: 0.7;
                    padding-left: 0.65in;
                    padding-block: 0;
                  "
                >
                  Dodge DV:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="dodgeDvComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Join Combat:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.35in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
                <td style="line-height: 0.7; padding-block: 0">
                  Move / Dash:
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.25in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                  /
                  <input
                    type="text"
                    class="text-input"
                    style="position: relative; width: 0.25in; font-size: medium"
                    :value="joinCombatComputed"
                  />
                </td>
              </tr>
              <tr>
                <td
                  style="
                    font-size: x-small;
                    padding-left: 0.65in;
                    padding-block: 0;
                  "
                >
                  (Dex. + Dodge + Essence + spe.) / 2
                </td>
                <td style="font-size: x-small; padding-block: 0">
                  Wits + Awareness
                </td>
                <td style="font-size: x-small; padding-block: 0">
                  Dex. - armor mobility (+6)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div style="padding-block: 0">Weapons</div>
      </div>

      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Weapon</th>
            <th>Speed</th>
            <th>Acc</th>
            <th>Damage</th>
            <th>PDV</th>
            <th>Rate</th>
            <th>Range</th>
            <th>Tags</th>
            <th>Notes</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody style="font-size: xx-small">
          <tr v-for="(val, index) in weaponAccRefs">
            <td style="border: 1px solid black; padding: 0; width: 20%">
              <input
                type="text"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="weaponNameRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="weaponSpeedRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <div style="display: flex">
                <input
                  type="text"
                  style="
                    border: none;
                    width: 35%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: right;
                  "
                  v-model="weaponAccRefs[index].value"
                />
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: left;
                  "
                  v-model="weaponAccBonusRefs[index]"
                />
              </div>
            </td>
            <td style="border: 1px solid black; padding: 0; width: 10%">
              <div style="display: flex">
                <input
                  type="text"
                  style="
                    border: none;
                    width: 35%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: right;
                  "
                  v-model="weaponDamageRefs[index].value"
                />
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: left;
                  "
                  v-model="weaponDamageBonusRefs[index]"
                />
              </div>
            </td>
            <td style="border: 1px solid black; padding: 0; width: 8%">
              <div style="display: flex">
                <input
                  type="text"
                  style="
                    border: none;
                    width: 35%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: right;
                  "
                  v-model="weaponPdvRefs[index].value"
                />
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: left;
                  "
                  v-model="weaponPdvBonusRefs[index]"
                />
              </div>
            </td>
            <td style="border: 1px solid black; padding: 0; width: 5%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="weaponRateRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="weaponRangeRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="weaponTagRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0">
              <input
                type="text"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="weaponNotesRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 9%">
              <select
                style="
                  border-radius: 0%;
                  border: none;
                  width: 100%;
                  font-size: xx-small;
                "
                v-model="weaponTypeRefs[index]"
              >
                <option value="melee">Melee</option>
                <option value="martial-arts">Martial Arts</option>
                <option value="thrown">Thrown</option>
                <option value="archery">Archery</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div style="padding-block: 0">Armor</div>
      </div>

      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="text-align: left">
            <th>Armor</th>
            <th>Type</th>
            <th>Soak(L/B)</th>
            <th>Hardness</th>
            <th>Fatigue</th>
            <th>Mobility</th>
            <th>Notes</th>
            <th>Equipped</th>
          </tr>
        </thead>
        <tbody style="font-size: xx-small">
          <tr v-for="(val, index) in armorSoakRefs">
            <td style="border: 1px solid black; padding: 0; width: 20%">
              <input
                type="text"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="armorNameRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="armorTypeRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <div style="display: flex">
                <input
                  type="text"
                  style="
                    border: none;
                    width: 35%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: right;
                  "
                  v-model="armorSoakRefs[index].value"
                />
                <input
                  type="text"
                  style="
                    border: none;
                    width: 50%;
                    height: 100%;
                    font-size: xx-small;
                    background-color: transparent;
                    text-align: left;
                  "
                  v-model="armorSoakRefs[index]"
                />
              </div>
            </td>
            <td style="border: 1px solid black; padding: 0; width: 5%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="armorHardnessRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                  text-align: center;
                "
                v-model="armorFatigueRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 7%">
              <input
                type="text"
                style="
                  border: none;
                  width: 95%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="armorMobilityRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0">
              <input
                type="text"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                v-model="armorNotesRefs[index]"
              />
            </td>
            <td style="border: 1px solid black; padding: 0; width: 0.8in">
              <input
                type="checkbox"
                style="
                  border: none;
                  width: 98%;
                  height: 100%;
                  font-size: xx-small;
                  background-color: transparent;
                "
                :checked="armorEquippedRefs[index]"
                @change="
                  () => {
                    for (var j = 0; j < armorEquippedRefs.length; j++) {
                      armorEquippedRefs[j] =
                        j == index ? !armorEquippedRefs[j] : false;
                    }
                    console.log(armorEquippedRefs);
                  }
                "
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="full-bar-with-text">
        <img :src="fullBar" style="width: 8.5in" alt="bar" />
        <div style="padding-block: 0">In Combat</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import fullBar from "@/assets/img/full-length-bar-2e.png";
import logo from "@/assets/img/exalted-2e-logo.jpg";
import FiveDotRadio from "./components/FiveDotRadio.vue";
import { ref, watch, computed } from "vue";
import ThreeDotRadio from "./components/ThreeDotRadio.vue";
import HealthLevelRow from "./components/HealthLevelRow.vue";
import { exaltData } from "./exalt-data";
import ThreeDotEssence from "./components/ThreeDotEssence.vue";
import WillpowerDots from "./components/WillpowerDots.vue";
import VirtueDots from "./components/VirtueDots.vue";
import LimitPoints from "./components/LimitPoints.vue";

const exaltTypeRef = ref("solar");
const casteRef = ref("");
const strengthRef = ref(1);
const dexterityRef = ref(1);
const staminaRef = ref(1);
const charismaRef = ref(1);
const manipulationRef = ref(1);
const appearanceRef = ref(1);
const perceptionRef = ref(1);
const intelligenceRef = ref(1);
const witsRef = ref(1);

const abilityScoreRefs = ref({
  archery: 0,
  "martial-arts": 0,
  melee: 0,
  thrown: 0,
  war: 0,
  integrity: 0,
  performance: 0,
  presence: 0,
  resistance: 0,
  survival: 0,
  craft: 0,
  investigation: 0,
  lore: 0,
  medicine: 0,
  occult: 0,
  athletics: 0,
  awareness: 0,
  dodge: 0,
  larceny: 0,
  stealth: 0,
  bureaucracy: 0,
  linguistics: 0,
  ride: 0,
  sail: 0,
  socialize: 0,
});

const essenceRef = ref(1);

const willpowerRef = ref(1);

const compassionRef = ref(1);
const temperanceRef = ref(1);
const convictionRef = ref(1);
const valorRef = ref(1);

const weaponNameRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Clinch",
  "Kick",
  "Punch",
]);

const weaponSpeedRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "6",
  "5",
  "5",
]);

const weaponAccRefs = ref([
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
]);

const weaponAccBonusRefs = ref([
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+1)",
]);

const weaponDamageRefs = ref([
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
  { value: "0B", calculate: true },
]);

const weaponDamageBonusRefs = ref([
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+0B)",
  "(+3B)",
  "(+0B)",
]);

const weaponPdvRefs = ref([
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
  { value: 0, calculate: true },
]);

const weaponPdvBonusRefs = ref([
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(+0)",
  "(-2)",
  "(+2)",
]);

const weaponRateRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "1",
  "2",
  "3",
]);

const weaponRangeRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]);

const weaponTagRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]);

const weaponNotesRefs = ref([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]);

const weaponTypeRefs = ref([
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "melee",
  "martial-arts",
  "martial-arts",
  "martial-arts",
]);

const armorNameRefs = ref(["", "", "", "", "", "", "", ""]);

const armorTypeRefs = ref(["", "", "", "", "", "", "", ""]);

const armorSoakRefs = ref(["", "", "", "", "", "", "", ""]);

const armorHardnessRefs = ref(["", "", "", "", "", "", "", ""]);

const armorFatigueRefs = ref(["", "", "", "", "", "", "", ""]);

const armorMobilityRefs = ref(["", "", "", "", "", "", "", ""]);

const armorNotesRefs = ref(["", "", "", "", "", "", "", ""]);

const armorEquippedRefs = ref([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

// watch(abilityScoreRefs, () => {
//   console.log(`Integrity: ${abilityScoreRefs.value["integrity"]}`);
// });

const dodgeMdvComputed = computed(() => {
  var mdv =
    (willpowerRef.value +
      abilityScoreRefs.value["integrity"] +
      essenceRef.value) /
    2;
  return Number.isInteger(mdv) ? mdv : Math.ceil(mdv) + ".";
});

const dodgeDvComputed = computed(() => {
  var dv =
    (dexterityRef.value + abilityScoreRefs.value["dodge"] + essenceRef.value) /
    2;
  return Number.isInteger(dv) ? dv : Math.ceil(dv) + ".";
});

const joinCombatComputed = computed(() => {
  return witsRef.value + abilityScoreRefs.value["awareness"];
});

// watch(dodgeMdvComputed, () => console.log(dodgeMdvComputed.value));

watch(
  [weaponAccBonusRefs, dexterityRef, abilityScoreRefs],
  () => {
    for (var i = 0; i < weaponAccBonusRefs.value.length; i++) {
      if (
        !Number.isNaN(bonusToInt(weaponAccBonusRefs.value[i])) &&
        weaponAccRefs.value[i].calculate
      ) {
        weaponAccRefs.value[i].value =
          parseInt(dexterityRef.value) +
          parseInt(abilityScoreRefs.value[weaponTypeRefs.value[i]]) +
          bonusToInt(weaponAccBonusRefs.value[i]);
      }
    }
  },
  { deep: true }
);

watch(
  [weaponDamageBonusRefs, strengthRef],
  () => {
    for (var i = 0; i < weaponDamageBonusRefs.value.length; i++) {
      if (
        !Number.isNaN(bonusToInt(weaponDamageBonusRefs.value[i])) &&
        weaponDamageRefs.value[i].calculate
      ) {
        var dmg =
          parseInt(strengthRef.value) +
          bonusToInt(weaponDamageBonusRefs.value[i]);
        weaponDamageRefs.value[i].value = `${dmg}${
          weaponDamageBonusRefs.value[i].split("/")[0].includes("A")
            ? "A"
            : weaponDamageBonusRefs.value[i].split("/")[0].includes("L")
            ? "L"
            : "B"
        }`;
      }
    }
  },
  { deep: true }
);

watch(
  [weaponPdvBonusRefs, dexterityRef, abilityScoreRefs],
  () => {
    for (var i = 0; i < weaponPdvBonusRefs.value.length; i++) {
      if (
        !Number.isNaN(bonusToInt(weaponPdvBonusRefs.value[i])) &&
        weaponPdvRefs.value[i].calculate
      ) {
        var pdv =
          (parseInt(dexterityRef.value) +
            parseInt(abilityScoreRefs.value[weaponTypeRefs.value[i]]) +
            bonusToInt(weaponPdvBonusRefs.value[i])) /
          2;
        weaponPdvRefs.value[i].value = Number.isInteger(pdv)
          ? pdv
          : Math.ceil(pdv) + ".";
      }
    }
  },
  { deep: true }
);

function bonusToInt(string) {
  return parseInt(
    string
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("+", "")
      .split("/")[0]
      .replaceAll("B", "")
      .replaceAll("L", "")
      .replaceAll("A", "")
  );
}

function capitalizeFirstLetter(string) {
  if (!string) return ""; // Handle empty or null strings
  var splitStr = string.replaceAll("-", " ").split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}
</script>

<style>
/* Required for printing backgrounds */
* {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

.page {
  width: 8.5in;
  height: 11.5in;
  padding: 0.75in;
  padding-top: 0.6in;
  background-color: white;
  margin: auto;
}
.text-input {
  border: none;
  border-bottom: 1px solid #000000;
}
.full-bar-with-text {
  position: relative;
  text-align: center;
}

.full-bar-with-text > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0.1in;
}

.attribute-dots {
  float: right;
  margin-right: 0.1in;
}

@media print {
  #health-level-time-table td {
    border: 1pt solid black !important;
  }
}
</style>
