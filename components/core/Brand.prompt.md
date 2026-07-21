The CloudLotse brand lockup — the **navigator double-chevron mark** (a thin rounded-square frame holding a forward double chevron, in three green tones) beside the two-tone wordmark (Cloud dark green / Lotse medium green). This is the official mark; never redraw it from memory.

```jsx
<Brand href="/" onDark />          {/* dark chrome: lighter greens */}
<Brand onDark={false} />           {/* light surface */}
<Brand showWordmark={false} size={40} />  {/* mark alone — app icon */}
```

Set `onDark` to match the surface. "CloudLotse" is split Cloud/Lotse automatically; any other `wordmark` string renders in a single dark-green tone.
