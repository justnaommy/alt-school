function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}

function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Map();

  for (const char of s) {
    count.set(char, (count.get(char) || 0) + 1);
  }

  for (const char of t) {
    if (!count.has(char) || count.get(char) === 0) {
      return false;
    }

    count.set(char, count.get(char) - 1);
  }

  return true;
}
function groupAnagrams(strs) {
  const groups = new Map();

  for (const word of strs) {
    const key = word.split("").sort().join("");

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(word);
  }

  return Array.from(groups.values());
}
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
function flatUnique(arr) {
  return [...new Set(arr.flat(Infinity))].sort((a, b) => a - b);
}